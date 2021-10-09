---
templateKey: blog-post
title: "Optimize React Media Player with XState \U0001F389"
date: 2020-09-28T04:24:44.414Z
description: "At Axon, I have been maintaining and developing the core media libraries that powers most of our media players across our set of products with the mission \"Write code, save life\". In this post, I would like to share my recent discovery about how the current architecture could be improved and be more reusable. Stay tuned \U0001F60E"
tags:
  - Axon
  - React
  - XState
  - Media Element
  - Media
---
[Accompany presentation](https://next-media-optimization-axon.netlify.app/)\
\
Previously, I did share [my invented media architecture](https://namnguyen.design/blog/2020-06-02-ui-frameworks-and-media-element-%F0%9F%8E%A7/) to work in harmony with UI frameworks. Not long after that, I crafted a dedicated package so-called **next-media** to serve the higher purpose at Axon - "unify media experience". The biggest goals of the package are maintainability and flexibility. Any developers should be able to jump in the documentation and start customize their own media players within matter of hour(s) or less if they are already familiar themselves with media elements in the web. With respect to maintainability, I spent a while section explained on code structure, couple of decision I have made and reference links on [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) and [Media Source API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) for loading media stream dynamically. Performance was not part of the big picture as I wanted to make the library minimal, simple yet powerful and get everyone up and running as quickly as possible. I did not use anything fancier than just React, HLS.js and our company's UI design system. Recently, couple of my colleagues came to me and share their concerns about performance hit they face when using next-media in practice. This post will go through and explain in detail how I made performance optimization possible and why I think it's not necessary in our use cases at Axon 😊

First and foremost, I have used [React's Context](https://reactjs.org/docs/context.html) underneath the hood to power our media player. This comes with pros and cons as followings:\
\
**Pros:**

* It avoid prop-drilling issues common in React
* Any nested children can interact with media context as long as it's place in side Media Context Provider
* Simple centralized state management system instead of using bloated solutions like Redux or MobX
* Everything is synchronous -> React's Context is perfect for this simple use case of media player

**Cons:**

* Since all states located inside Media Provider component. any simple update will trick the re-render process in React
* All connected components will be re-rendered on media context change even though they are not consuming that changed state directly

The first drawback might seem as bad as it sounds. Many of many colleagues thought it's a wrong way to do it even. I have used next-media in one of our project at Axon to tailor one video players that needs to interact with many components located across the page. Hence, I decided to wrap everything inside MediaProvider even for the ones that do not consume media context at all. This might seem to be insane amount of overhead in execution of React's rendering process. It's actually not as bad as most of us might be thinking right now. React has a very well written section on [how to optimize React for performance](https://reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action) . The one we should concern the most here is shouldComponentUpdate section as that's exactly what next-media has been using in action since its first day of existence. Specifically, MediaProvider is described as C8 component in the post. Even though MediaProvider component re-render itself on every state update. The component located inside its children won't be re-rendered unnecessarily unless it's part of the MediaContext's consuming flow. I won't bother explain much of that in this post but leverage awesome post by Kent C Dodd [here](https://kentcdodds.com/blog/optimize-react-re-renders).\
\
The second drawback is the one that I want to light up the most in this post since I spent the last weekend working on it 😄. It's super bothering me when I have to see some (expensive) components have to be re-rendered on media context change. For instance, PlayToggle button component should not be re-rendered when currentTime (the most frequent change state) of the media element changes. Unfortunately, since it's React (You won't get performance optimization by default as in Vue - I'm bias and I'm a big fan 😝) and the connected component did not know whether or not it should re-render on media context change. Here we go my adventure on how I have incrementally optimized next-media's performance.\
\
**First try:**

The quickest and simplest one would be splitting connected component into two separate components for optimization (similar to container and presentational pattern famous back in the day of React's world). Now we can apply React.memo or even useMemo hook if that kind of API fancies your tickle 😄. The presentation component will be checked on props changes. In case of PlayToggle button component, the props it receives will be paused and setPaused. These are simple to compare when React's re-rendering process kicks in. This solution works fairly okay but does not seem to be good enough.\
\
**Second try:**

Up until this point, I have placed all media state inside MediaProvider component which leads to reasonably small overhead inside that component. I got an idea of applying exactly [what Recoil does in their project](https://namnguyen.design/blog/2020-08-21-how-recoild-works-its-magic-behind-the-scene-%F0%9F%8E%89/), I decided to extract the media states out of MediaProvider component while making sure all connected components got re-rendered on state update. Here is the fun began, I knew I needed some kind of observable implementation to make this work. I imagined I was standing in front of ton of solutions that offer similar capabilities. We got Redux, MobX, Stately, UnState, XState et cetera. I'm kidding, I know I would go for XState since its my favorite state management library of all time. Redux is bloated, MobX is quite cumbersome and heavy weight, etc. I wanted something extremely lightweight and works. XState FSM and its accompany connector to work with React serve the purpose [so well](https://bundlephobia.com/scan-results?packages=@xstate/fsm@1.5.1,@xstate/react@1.0.0-rc.6). 3 KB is all it takes to resemble the whole solution to work beautifully.

![XState bundle size](/img/xstate-bundle-size.png "XState bundle size")

In XState, we have a concept of state machine which is exactly what I need to use to store media context state. I created a very simple state machine for media called mediaMachine as the following:

![Media machine](/img/media-machine.png "Media machine")

It has one finite state only called **ready** and some infinite states (media state) placed in context of XState. Now, all I need to is hook this up to MediaProvider. On initial load, I start the machine and place it inside ref for later use. Since there is not any state placed inside MediaProvider, it won't be re-render on state change anymore and the media state is placed safely in mediaMachine's context. 

![Media Provider Machine](/img/media-provider-xstate.png "Media Provider Machine")

Next, I need to update the useMediaContext hook to consume data from mediaMachine and pass down to connected components.

![Use MediaContext Machine](/img/usemediacontextmachine.png "Use MediaContext Machine")

Now, the MediaProvider won't be re-rendered anymore on state update since its media state got hoisted to the cloud just like Recoil 😎

![Recoil Architecture](/img/recoil_diagram.png "Recoil Architecture")

But, this solution only improve the rendering process **inside** MediaProvider only. All connected components still need to be re-rendered on un-consumed state as demonstrated in the case of PlayToggle button component above 😌\
\
**Third try:**

I got so closed to where I wanted. I could have just combined the first and second tries solutions to have the full picture's repainted with performance. But It doesn't feel right, I could not feel completely fulfilled. I kept researching over the XState repos and came across [this discussion on useService Performance Recommendation](https://github.com/davidkpiano/xstate/discussions/1209). And voila, it's exactly what I need for my next-media to be performant. I created a new hook called **usePartialMediaContext**. As the name indicates, the consumer of this hooks will only use partial state of the media context values, this hook **WILL NOT** trigger the re-rendering process unless one or more of the directly consumed states change.

![Use Partial Media Context Machine](/img/usepartialmediacontext-mechine.png "Use Partial Media Context Machine")

And here is what PlayToggle button component looks like in performance mode 😍

![Play Toggle Machine](/img/playtogglemachine.png "Play Toggle Machine")

**Fourth try:**

There was still one thing that really bogged me down. After third try, I had one media performant hook in place to return partial state and normal media hook to return full state. This increases the API interface for developers to learn and more decisions to make when to use which hook. What if I could combine them into one hook, provide strongly typing out of the box, reusable code in other places such as HOC and Render Prop, and option to select partial state for performant purposes. This is where I struggled a bit with TypeScript since I'm not an expert 😆. After couple of researching hours, I found the solution. It looks almost identical to useSelector from React-Redux library with one subtile difference. The useMediaContext hook below will return by default all state from media context values if custom selector is not passed in and the selective values will be returned otherwise with typing support. The solution is pretty clean as below 😬 

![Media Context Full](/img/mediacontextfull.png "Media Context Full")

**Final try:**

There is still one last minor thing I think we could and should improve. As we are using useEffect hooks. The dependency list can cause the first function argument of useEffect hook gets re-run again, again and again. Whilst making improvement over this next-media, I happened to come across this line of code from [React-Redux library](https://github.com/reduxjs/react-redux/blob/90795b6a907abc8f5e7cbece4df53a5ac5482daf/src/hooks/useSelector.js#L15-L15). They decided to store all states in refs instead of useState hook as usual and use a trick of forceUpdate. This was exactly what I needed for next-media's useMediaContext hook to be performant as the selector inline function will be different on every render. And here it is the improvement 🤘

![Use Media Context with Ref](/img/usemediacontext-useref.png "Use Media Context with Ref")

\
So far so good, you guys might think I just solved my colleagues' performance hit issues by applying minimal but complete XState and recommendation from its creators. The final decision for my next-media was to keep it as-is. Even though next-media works wonderfully and supercharged by XState. It does not mean I want to ship it to production. Let's relax, sit back and revise our Axon's use cases I set for next-media in the first place 🤩

1. Maintainability  - This is my number one point of delivery, any developers should be able to start with next-media as quickly as possible compared to any bloated solution out there (believe me, I have read a ton out there before making up next-media 😌). I primarily use React for media architecture to work and  that is it xD. Any extra dependencies will add more concepts that might be liked or not liked from the future maintainers - aka [\#aintnobodygottimeforthat](https://twitter.com/hashtag/aintnobodygottimeforthat) lol
2. Performance is absolute acceptable. At Axon, correctness is placed over performance. I already know next-media able to gets its consumers deliver products with velocity and quality. I have met my requirement. Unless we are like YouTube where a fraction of milliseconds matter, I will definitely optimize the media player as fast as I can even if I have to code vanilla JavaScript 😄

You guys can play around with the demo in [this CodeSandbox link](https://codesandbox.io/s/media-player-with-xstate-demo-mo5t1) 🥳

In conclusion, I'm very happy that next-media is on the right track. Nothing goes in vain though, I do React for a living but Vue is my passion. In Vue, they just do it for ya and I don't have to make a lot of decisions of performance optimization as in React. Anyways, I love working at Axon to serve our mission "Write code, save life". Thus, technologies are not my biggest concerns at of writing 😄. Previously, I have implemented the media architecture in Vue, Angular and React with different state management systems accordingly (React's Context, Vue's Dependency Injection, Angular's RxJS). It's not the case anymore since XState is framework agnostic, the media machine can be used in any UI frameworks with some more amount of code written for connector (XState has packages for Vue, React and more FYI 😋) I will start porting the solution into Vue one day for sure 😇. Good bye for now and until next time guys 🤘\
\
❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
