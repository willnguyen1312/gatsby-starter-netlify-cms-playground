---
templateKey: blog-post
title: "Clean Code UI Refactoring at Axon \U0001F389"
date: 2021-10-04T04:35:47.742Z
description: "In this post, I would like to share my experience on how I did refactor fairly messy React's context based codebase into clean, nicely encapsulated abstractions backed by SOLID principles and application of several well-known design patterns. Stay tuned and read on guys \U0001F60E"
tags:
  - Clean Code
  - Axon
  - React
  - SOLID
  - Design Pattern
  - Refactoring
  - Redux
---
At Axon, we provide a solution for defense departments around the world to view different kinds of [evidence](https://www.axon.com/products/axon-evidence) in the web namely audio, video, image, document, log. The latest exciting of supported file format is **zip** (compressed evidence). I have been part of UI code maintainer group at Axon's DEMS (Digital Evidence Management System), we are responsible for assuring high code quality review before shipping our products to production. I got a chance to review with the team that was developing ZIp viewer for the last several months. The bellow is their stack choices of technology:

* React's Context
* React's Hook
* Redux (it's actually just a fancy React's Context underneath the hood 😆)

First of all, I have never been a fan of [Flux](https://facebook.github.io/flux/) / [Redux](https://redux.js.org/) architecture given its terrible verboseness of boilerplate we have to write. [Redux toolkit](https://redux-toolkit.js.org/) came into the picture lately to heal things up, but it's still Redux at very core in which suffer from [awkward choice of merging local state and server state into one](https://www.youtube.com/watch?v=seU46c6Jz7E). Things will get even worse when you want to cache something or integrate with WebSocket... That's where [React Query](https://react-query.tanstack.com/overview) really excels at. It's my go-to recommendation for any application that deals with data fetching Restful protocol. But, you are most likely have maintained at least one application that have used Redux in recent years since it's been blooming back in 2015 via [this talk](https://www.youtube.com/watch?v=uvAXVMwHJXU). I'm right with you, many projects at Axon are also suffering from the same issues with Redux's drawbacks and lack of principles from the very beginning until [style guide](https://redux.js.org/style-guide/style-guide) appeared apparently. Another issue with Redux lays in its implementation of O(n) time complexity in every run by default. It's not scoped by nature and high performance in [comparison to Vuex](https://namnguyen.design/blog/2020-12-21-vuex-high-performance-flux-implementation-%F0%9F%8F%8E/). Solutions like [Redux-ignore does help](https://twitter.com/dan_abramov/status/656049225566920704) a bit but still... I think performance should be built-in instead of letting community brainstorming which leads to exploding amount of solutions.

Secondly, the team chose to use React's context for everything at the top level which they thought it could help them avoid prop-dripping. This comes at the const of breaking encapsulation and potential for code reuse in other places. It also leads to many problems specifically:

* Context Provider easily became a god object which knows every little detail of child components
* Simple state such as toggle show / hide modal is also included in the context which has nothing to do with other logic
* There is zero chance of code-reuse and composition since every child components stuck with consuming specific context

I started it by convincing the team that React's context and Redux are not the right tools for the job with the [reference to React's official guide](https://reactjs.org/docs/context.html#before-you-use-context). After that, I kicked things off by moving all pieces to where it belongs by [purely using local state](https://twitter.com/dan_abramov/status/842326284533432320). It's actually very similar to [actor model](https://www.brianstorti.com/the-actor-model/) for UI development 😄

![Redux Versus Actor](/img/redux_vs_actor.png "Redux Versus Actor")

You also might want to spend sometime to enjoy the brilliant content of this video 😎

<iframe width="100%" height="410" src="https://www.youtube.com/embed/NTfPtYJORck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I also explained several principles applied along the ways to the team such as [SOLID in component architecture](https://namnguyen.design/blog/2021-07-01-solid-in-component-architecture-%F0%9F%8E%89/), [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html) actually is [Mediator pattern](https://namnguyen.design/blog/2019-12-25-mediator-pattern/) in disguise and should be used more often, [Factory Method pattern](https://namnguyen.design/blog/2019-12-21-factory-method-pattern/) is also very useful for grouping a set of similar components at the point of creation (e.g. Icon set), [Strategy pattern](https://namnguyen.design/blog/2019-12-25-strategy-pattern/) plays a key role in selecting the right evidence viewer for us (there can be any video, image, document, etc inside a zip evidence), [backtracking algorithm](https://www.geeksforgeeks.org/backtracking-introduction/) is a very effective way for us to collect all the paths that contain items matched arbitrary predicate in a tree data structure (i.e zip file). The demo below shows how codebase looks before and after my big shot of refactoring:

<iframe width="100%" height="410" src="https://www.youtube.com/embed/KCsIanlh_8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

As a result, we now have variously dedicated components (actors) which are in charge of specific tasks in our component architecture. We can easily let them communicate by talking to each other (trust me, [prop-drilling is no biggie at all](https://twitter.com/housecor/status/1437765667906854915)), reuse else where and tested in isolation.

There you have it guys, my story on how I untangled messy codebase into clean, encapsulated, nicely formed abstractions for maximizing code reuse and maintainability . With that, I hope you guys learn something useful, avoid the same mistakes we made and enjoy problems solving in this world 😇

❤️❤️❤️ Be well, Be happy ❤️❤️❤️
