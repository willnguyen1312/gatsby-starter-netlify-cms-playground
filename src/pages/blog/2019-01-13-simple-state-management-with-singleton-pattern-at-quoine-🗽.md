---
templateKey: blog-post
title: "Simple state management with singleton pattern at QUOINE \U0001F5FD"
date: 2019-01-13T07:51:56.221Z
description: >-
  This blog post is explaining how I applied Singleton pattern from the Go4 to
  solve simeple state management problem.
tags:
  - state-management
---
At QUOINE, we use [Redux](https://redux.js.org/) for all the thing with regard to state management. It comes with several costs:

* Boilerplate all over places
* Action, reducer and connected component are three files to maintain regardless of the size of a feature
* The whole React's VDOM tree re-renders on every action dispatch because we do not use any immutability library in combination with Redux

Currently, we need a way to replace static list of fiat currencies on the client-side Javascript application by a dynamic one returned from the API on application start-up. This is something that rarely change overtime, it's a one-off operation. We need a data fetching mechanism to store the list of fiat currency before first render hit the screen. The solution I chose is heavily inspired by blog post from the one and only Kent C Dodds 👨🏻‍💻 - [Application State Management](https://blog.kentcdodds.com/application-state-management-66de608ccb24).

The code snippet is as the screenshot below:

![State management singleton pattern screenshot](/img/state_management_singleton_pattern.png "State management singleton pattern")

The module export two methods for setting and getting a list of fiat currency. After bootstrapping the application, the dynamic list will be fetched over the wire and set value back to fiat currency list. Anywhere inside the application code that needs access to this list, it can just simply use getFiatList method for that purpose.

**Conclusion:**

With that simple approach, I could replace the static list of data located on the client side by dynamic one returned by the server. The transition is painless thank to the simplicity brought by singleton pattern. This process would have never been easy this way if I had chosen the path to go with Redux. I could be able to avoid create one more reducer, action and countless of connected components just for that piece of dynamic data. One last thing, I would like to point out to the old and valuable from our beloved Dan Abramov - [You might not need Redux](https://www.google.com/search?q=you+might+not+need+redux&oq=you+might+not+need+redux&aqs=chrome..69i57j69i64.3030j0j1&sourceid=chrome&ie=UTF-8). 

Until next time - cheer 🎉 😊 🎉
