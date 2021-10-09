---
templateKey: blog-post
title: "Vuex - High performance Flux implementation \U0001F3CE"
date: 2020-12-21T02:48:24.137Z
description: "In this post, I would like to share my thought upon recent digging into Vuex implementation specifically latest version which support Vue 3 - v4.0..0-rc.2. It is such a mind-blowing repository compared to Redux which leads to a very performant library. Stay tuned and read on guys \U0001F60E"
tags:
  - React
  - Vue
  - Redux
  - Vuex
  - State Management
---
[Previously](https://namnguyen.design/blog/2020-08-21-how-recoild-works-its-magic-behind-the-scene-%F0%9F%8E%89/), I have touched on how [Recoil](https://recoiljs.org/) makes it's so easy to mange large-scale application with performance in mind. Later, I found [an interesting tweet from Evan You](https://twitter.com/youyuxi/status/1261719640172048385) with respect to Recoil as below

> Haven’t checked the internals, but from the surface Recoil (newly open sourced React state management lib by FB) shares quite some similarities with MobX / Vue. Specifically the idea of only triggering updates in components that actually depend on changed state.

At Axon, we have used Redux massively as our state management solution. If you are working at Axon as UI engineer, you'll most likely see it everywhere in your daily work 😄. Personally, I'm not a big fan of Redux from the beginning due to its boilerplate. I found myself much more productive with [other state management solutions](https://kentcdodds.com/blog/application-state-management-with-react) such as React's Context, UnState, XState and of course the new kid in town - Recoil. Nonetheless, Redux really shines at scale in term of engineer size. From the stories I've heard and Axon, we have not faced any problems with regards to logic flows and code organization in Redux. But there is always something bugs me about Redux which is its overhead and performance hit in intensive state update application.

Redux documentation has [a dedicated documentation on performance](https://redux.js.org/faq/performance) which I found it overwhelming. Since I'm a fan of Vue, everything should work out of the box with high performance as built-in feature. And, I have used Vuex which is Flux's implementation from Vue ecosystem. I decided to go through their implementation over the weekend to see why it's performant and how it's able to overcome couple of Redux's limitation of as my understanding:

1. Redux has exactly one giant reducer which is typically composed of many other reducers. They are in charge of handling actions. This means every single reducer will need to be aware of every action, think of redux-form where each keystroke triggers a massive calling chain in reducers 😱
2. Most Redux users use switch-case for handling action in their application. This is fine but has as your reducer grow, you will see each case path will be reached - this is a big overhead at scale. You can avoid that by user table lookup (yeah, you guessed it, it's O(1) constant time complexity here baby 🥳) which is [already documented in Redux's official documentation](https://redux.js.org/recipes/reducing-boilerplate#generating-reducers) 
3. Reselect is often used hand in hand with Redux as state selector library for creating effect state getters
4. Redux relies on the immutability of the state which can cause a lot of work for GC (Garbage Collection) at runtime - more on this later
5. Massive documentation to read through for various use case

First of all, [Redux has exactly one reducer](https://github.com/reduxjs/redux/blob/aa6795682a7532b3e6a64464b77f6d61ea1b25ed/src/combineReducers.ts#L192-L209), this block of code is the one that will be run on each Redux's action after being created.

![Redux Reducer](/img/redux_reducers.png "Redux Reducer")

As the root reducer will be recursively calling all of its nested reducers to compute the next giant state of the store. This will trigger re-render in all connected react's component (connect and useSelector will help but still an overhead especially at scale, slow performance will be noticed). [Vuex has overcome this](https://github.com/vuejs/vuex/blob/c9dbb13d4138d0e7d82d103dd3275fc18fa72d28/src/store.js#L361-L364) by having an instant O(1) map lookup for all of its mutation (that's what they called instead of reducer).

![Vuex Mutation Map](/img/vuex_mutations_map.png "Vuex Mutation Map")

As the result, not only zero overhead is provided on each store's commit in Vuex but also only connected component asking for specific piece of data will be re-render thank to Vue's reactivity system.

As an application developer, we will often find a need to compute data from our store to display on the UI such as fullname, total price, todo notes, et cetera. This is where Reselect comes into place with Redux as accompany library. The result from state selector is cached until one of its arguments changed, the new data will be recomputed and is composable. This is nice and sweet but there is still more concept to learn for developers and gotchas is unavoidable. Once again, Vuex makes it very intuitive by having something called getter baked into the project. As Vue application consume state from Vuex's store, it will leverage the beauty of reactivity system from Vue by using [computed method](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values). The UI will be re-rendering accordingly whenever state changed inside computed's pass-in function.

Next, changes in Redux is made which pure functions. Most applications likely deep-copy as much as necessary and make modification to create new state. This normal creates new state object reference and throw away the old state for GC to collect. When your application is at scale, this typically will put a lot of pressure on GC and cause jank in your application. This can be overcome by using immutable data structure library such as [Immutable.js](https://immutable-js.github.io/immutable-js/) or [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) which reuse the existing objects instead of instantiating new ones. But one again, this will lead to more concept to learn and discussion to make final decisions on what to use. In Vue, [it's a piece of cake](https://v3.vuejs.org/guide/reactivity.html) since every property in object can be reactive itself - any mutation will only trigger updates in components that actually depend on changed state 🥳

Last but never be the least is the huge documentation Redux itself combined with React-Redux library as most developers will use in their application. Vuex's documentation is short, well-organized and super easy to start with. Here is the side-by-side comparison of Vuex and Redux's documentation

![Vuex Redux](/img/vuex_redux.png "Vuex Redux")

While Vuex's documentation can fit inside my screen's viewport. It's impossible with Redux and React's Redux (which I already excluded in the screenshot). At the end, developers just want to ship app with features rich and light without debating on what to do and which to use. The less is actually more 🤠

All in all, I found myself super productive and having more fun when working with Vuex application. I know React has become the most popular technology and backed by giant tech company but Vue has been baked with passion. What's a life without passion right? I don't mean to judge React or Redux by my posts, I have learnt a ton from all open source software. All libraries' authors have their own circumstances to live with that makes them end up with very different decisions. At the end, it's just that one is better for others and vice versa 😊. Good bye for now and until next time guys 🤘

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
