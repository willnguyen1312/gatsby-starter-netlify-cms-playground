---
templateKey: blog-post
title: "The rise of headlessmedia and application of Observer Pattern \U0001F389"
date: 2020-10-20T07:25:28.280Z
description: "In this post, I would like to share my experience by working on personal media library so-called \"headlessmedia\". It is the set of media libraries designed for UI frameworks such as React and Vue to help ease the work when it comes to media development experience. Stay tuned and read on guys\U0001F60E"
tags:
  - Axon
  - React
  - Vue
  - Observer Pattern
  - Media Element
  - Media
---
[](https://next-media-optimization-axon.netlify.app/)In my [previous post](https://namnguyen.design/blog/2020-09-28-optimize-react-media-player-with-xstate-%F0%9F%8E%89%F0%9F%8E%89%F0%9F%8E%89/), I wrote about how I could use 1 KB of XState to optimize next-media package at Axon but decided not to due to maintainability. Later, I figured out the way which could satisfy my concerns about next-media. I could get minimal bundle size addition, performance optimization and zero new concept for maintenance. Let's travel back in time and see I have done that step by step 🚶🏻‍♂️

Interestingly at first, I came across [this tweet](https://twitter.com/youyuxi/status/1261773119003537408?lang=en) from Evan You - creator of Vue.js. This got me exciting to try out how @vue/reactivity could work together in harmony with my next-media. As it turns out, it's super easy to switch from XState to @vue/reactivity package and it's pretty [small](https://bundlephobia.com/result?p=@vue/reactivity@3.0.1) - less than 4KB at max will be added to the bundle size. We only need to change two places to make the switch happens beautifully. We need to use reactive system from @vue/reactivity to store media state as below

![Create Media Vue State](/img/createmediavuestate.png "Create Media Vue State")

And then useMediaContext, we can drop useEffect in favor of effect from @vue/reactivity

![Use Media Context Vue](/img/usemediacontextvue.png "Use Media Context Vue")

And we are done switching from @xstate/fsm to @vue/reactivity. It's too easy to be true in my standpoint 😅. This got me thinking about one question "Are they sharing similar trait under the hood, that's why it's so easy to swap them!". In order to answer this question, I decided to spend some times to study them.

First and foremost, I did reverse-engineer XState and try to understand what is going on in their implementation. It's surprisingly simple and I could grab the main concepts of XState such as state machine, transition, pure function and observer pattern. After then, I moved on to @vue/reactivity system and came across this fantastic post from one nice guy from Vue community about [understanding Vue's reactivity system](https://dev.to/jinjiang/understanding-reactivity-in-vue-3-0-1jni). Behind the scene, Vue leverage [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) feature from ES6 to offer both performance and overcome couple of caveat compared to [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) in Vue 2. Proxy helps to set up a trap over JavaScript object such as simple object, Map, WeakMap, Set and WeakSet. Besides, Vue also have dependency tracking system in place in order to know when to notify all the listeners upon state update.

Having fair amount of knowledge from both sides, I could conclude that they share one key important trait to help me overcome limitation of React's performance. It's **Observer Pattern**. I decided to wire up a fairly simple but effective observer pattern implementation to provide exactly what I achieved previously (you could visit my post on observer pattern [here](https://namnguyen.design/blog/2019-12-25-observer-pattern/) but with implementation in Golang).

![Create Media State](/img/createmediastate.png "Create Media State")

And here is the implementation of useMediaContext

![Use Media Context](/img/usemediacontext.png "Use Media Context")

And that's it. It's that simple to overcome limitation of React's performance. I now got the following as I desire

* Maintainability - simple observer pattern implementation
* Performance - connected react component will only get re-rendered when their consumed state updated
* Bundle size - the change is extremely minimal ~ less than 200 LOCs plus comments

Up until this point, everything is going well for next-media. But, I found something I would definitely love to do. I came across one of Adam Wathan's [repo](https://github.com/tailwindlabs/headlessui) called headlessui. It absolutely took my breath away about how one libraries could truly be reusable by being headless. And, I decided to make one for media and call it [headlessmedia](https://github.com/willnguyen1312/headlessmedia). By being a core maintainer of media experience at Axon, I have fortunately faced a ton of problems that not many places could offer me. But there is always room for improvement, and this repo is exactly where I want to go. It's 100% out of my comfort zone and I feel like it's something I love to do. There are several things that I found more or less limited (for various reasons) about media experience at Axon. Here are the things I found crucial:

1. We apply [compound components pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks) to ease development with React's Context API
2. We make media package complied with our Axon's UI design system
3. Extensibility and performance are problems we face because we chose to use material-ui which can be [hard to extend](https://maxrozen.com/guide-to-component-ui-libraries-react/) in certain circumstances

Most of our application of media at Axon only requires to serve single  media element at a time. Our next-media package support that cases very well. But there will be limitation in development experience if we have to handle more than media at the time to control because most control items should be rendered inside its according context. We can overcome that by attach different ids to native media elements and take control from their instead but that approach is not very intuitive in React at all and very imperative. Headlessmedia package is not having this problem since I decided to hoist all the states up to one singleton pub/sub store - aka channels. Any media elements and their related controls can interact with each other as long as they can grab the ids of their target media element. From my personal standpoint, it's an enhancement over simple observer pattern but work with multiple instances of media players in the screen regardless of its location

![Media Store Pub Sub](/img/mediastorepubsub.png "Media Store Pub Sub")

Headlessmedia's mission is the followings:

* [](https://preactjs.com/)Preact support
* React support
* [](https://v3.vuejs.org/)Vue support
* HLS support
* Dash support
* ScreenCaptureAPI support
* WebRTC support

At of now, I'm actively working on releasing v1 of the packages. It's super exciting to see how much code I could share among all libraries implementation. I decided not go deeply into every design I have made for headlessmedia in this posts and hold it for later posts once I release them. If you happens to read this post before I release it (hopefully - I don't get paid for doing OSS so that my time for it is very limited), please feel free to [check out the rep](https://github.com/willnguyen1312/headlessmedia)o and make contribution if the idea fancies your ticket ^^\
\
All in all, I'm really glad that I could make a progress over [my past self](https://namnguyen.design/blog/2020-06-02-ui-frameworks-and-media-element-%F0%9F%8E%A7/). Previously, I had to implement different state management in Vue, Angular and React (Dependency Injection, Context and RxJS accordingly). And now, not only could I deliver a fairly simple yet minimal and complete framework agnostic solution with software design pattern applied but also entering myself into a horizon of challenges that definitely helps me later on in my future work. Good bye for now and until next time guys 🤘\
\
❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
