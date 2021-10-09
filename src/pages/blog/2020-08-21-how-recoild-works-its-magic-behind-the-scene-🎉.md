---
templateKey: blog-post
title: "How Recoil works its magic and the greatness of XState \U0001F389"
date: 2020-08-21T08:05:27.940Z
description: "At ReactEurope 2020, one Facebook engineer named Dave McCabe announced to the world one tool that he made. Another state management library for React so-called Recoil. In this post, I am going to put down my personal thoughts on this new cool kid in town and my most favorite tool - XState. Stay tuned \U0001F60E "
tags:
  - React
---
State management is hard, especially in large and complex application where we have thousands of components to form a single master piece of application to deliver some value to its intended customer. Popular libraries such as React, Vue, Angular, Cycle, Aurelia, Svelte, etc have done a fascinating job in abstracting the rendering logic to the UI environment (web, mobile, desktop, embed devices, etc). The developers nowadays have less things to worry about code size becomes un-manageable thanks to declarative UI development offered by modern UI frameworks. However, while these libraries excel at view layer regardless of scale of projects. There are one crucial part worth worrying about in every large, enterprise-class applications. It's well known as state management.

In recent years, there are various solutions have arrived by according frameworks to help developers over come the difficulties when manage state at scale. The following list are the most popular in order subjectively:

* Redux (React)
* MobX (React)
* NgRx (Angular)
* Vuex (Vue)
* XState (framework agnostic)
* Others

Redux has been popularized by React's community thanks to its predictability in large application in the beginning. One giant store with separation of concerns across action, reducer and selector. The way people often structure Redux-React app is to have almost if not every piece of state in Redux' store. [Even the creator of it cannot give you the best practice](https://github.com/reduxjs/redux/issues/1287) either since Redux is very un-opinionated about how someone might structure their app's store. Similar to React, Redux's eco-systems have arisen vastly with insane amount of solutions available on Github for others to pick in case something fancy their tickle 😆. One of the most prominent issue I found in Redux is [its performance](https://redux.js.org/faq/performance#redux-faq-performance). Under the hood, [React-Redux use context API](https://github.com/reduxjs/react-redux/blob/f0124d71f959224fd1aebc02d50ce0069e58c5e5/src/components/Provider.js#L33) for allowing any nested components access the data stored in Redux. All connected components will be re-rendered on store's data change even if those components never consume the updated part of data. And for every single action dispatched will cause all reducers to take part in to construct the next state. It's not un-common that we have many reducers react to single action across different piece of store -> this could cost issue in those application that apply code-splitting on reducer or async actions creator such as redux-saga. Because Redux is very versatile. The greater flexibility comes with greater responsibility. The first piece of library got into this rabbit hole I known  Since Redux has been out since 2015, and communities have studied from each other and came up with various solution. The most outstanding one in React's community just arrived - [Recoil](https://recoiljs.org/). I watched the embedded in the official site. There are something that really caught my attention:

1. The problem they faced could not be solved by Redux
2. All state are hoisted up to the "cloud" for components to access read/write, connected components are only updated if they consume the relative pieces of data

![Recoil Diagram](/img/recoil_diagram.png "Recoil Diagram")

Let's go over them one by one. First and foremost - Redux. At of writing, I have been under employment with Axon Public Safety for one and a half years, we have used Redux for almost everything. Personally, I never been a huge fan of Redux due to the reasons explained above. I does with [Vuex](https://vuex.vuejs.org/) from Vue community, it's super performant and fast thanks to the O(1) access via JavaScript's object when it comes to state, getter, action, mutation and modules. My most concerned technologies at work are redux and any libraries goes together with it such as redux-form. All connected components got re-rendered together with its children for every key stroke 😭 😱. Fortunately, at Axon we care about code and life so correctness is always placed on top of performance when they are on the trade. The problem Dave McCabe faced at Facebook are pretty intense as well since he had to deal with a lot data and moving pieces of data. He needed speed of updating, several hundred milliseconds of delay definitely caught his attention I believe 😆

Last but not lease, I did give Recoil a try and see how it feels like to use it. It definitely feel cleaner than Redux with performance since only relative components updated on store's data change. The API feel very much a like Redux with one Provider wrapper and context's API usage. It also re-rendered relative components with less gotcha compared to MobX -> what makes it performant then? I quickly got curious about how they can achieve that under the hood. I keep reading, reading and reading until I found the master piece key of work that power up the solution. The combination of React's context and **[Refs](https://reactjs.org/docs/refs-and-the-dom.html)**.

![Recoil Root](/img/recoil_root.png "Recoil Root")

The combination of these two React's API helps Recoil team deliver the stunning API surface for developers to consume. For most React's developers, React's ref is just an escape hatch for integration with third party libraries or access the raw DOM element but not many known the refs can be used to store valued across renders. Since React only re-renders when prop or state changed, ref's value update does no harm. There is a lot  more going on with this piece of technology since it's solving Facebook's problems, it must be complex and powerful but not simple. 

`const { useContext, useEffect, useRef, useState } = require('React');`

Surprisingly, Recoil does not use anything but React's hook API. They do apply a whole bunch of other techniques and power data structure under the hood such as Graph. Nonetheless, please so remember that [Recoil is not a official state management library of React](https://twitter.com/dan_abramov/status/1262143043928502272)

I personally prefer [Xstate](https://xstate.js.org/) which offer a whole bunch of benefit of the past, current and future of state management. It's not that common for UI developers to use state machine along with any libraries frameworks. It is not used popularly does not mean it's not great, feel free to give it a try, feel the weirdness at first and then you deserve the awesomeness of computer science baked into UI development. [My virtual mentor](https://twitter.com/kentcdodds/status/1213095386207768577?lang=en) also loves it 😍. Some benefits I found when using [state machine](https://statecharts.github.io/what-is-a-state-machine.html) and [state charts](https://statecharts.github.io/) instead of manually structure data store application is:

1. Confidence about how application will behave at any given state
2. Separation of concerns, data logic and view logic are decoupled for testing, rendering, and reason about
3. [Visualization](https://xstate.js.org/viz/) is great since we could see what states we have at any given point during our product's lifecycle instead of going through thousand  but not million LOCs

I'm currently working on a start-up application that use Vue in harmony with XState. I will post another article to share my development experience with XState. It is going to be great and exciting, nobody likes bugs so do not let them have chances to exist. Deploy code to production, rest assured and sleep well are all I care about 😊 

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
