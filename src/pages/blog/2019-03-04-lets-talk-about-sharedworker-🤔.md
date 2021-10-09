---
templateKey: blog-post
title: "Let's talk about SharedWorker \U0001F914"
date: 2019-03-04T11:39:48.789Z
description: >-
  I would like to write a blog post about how we employ SharedWorker at QUOINE
  in production. The problems we are trying to solve when using it and the
  drawbacks incur eventually.
tags:
  - QUOINE
---
QUOINE's core product is a trading platform for cryptocurrency where people can trade various kind of currencies includes famous ones like Bitcoin and Ethereum. In order to have a real time system in place, we decided to go with [Pusher](https://pusher.com/) realtime APIs as a service vendor. Thus, we don't have to worry about technical implementation for both Back-end and Front-end sides. Furthermore, the documentation is fantastic and their application's dashboard is so great.

The trading application always has up to 5 channels connect to one single socket to receive and push data back to the server. One day, our team decided to use [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) under purpose of saving memory usage on multiple tabs. By doing so, we had to move the client library pusher-js over separate thread owned by the shared worker, meaning that we no longer have access to pusher client anymore from the main thread. We traded memory consumption for complexity. As of now, the client devices don't have to open many web socket to get up-to-date data from the server as everything will be done via communication between main thread and shared worker one. Another problem we pumped into is the code-splitting issue. As the time of this writing, webpack has no support for loading shared worker, only dedicated worker are supported. This make the complexity of our application rose up more or less.



**Conclusion:**

Using shared worker to save memory in production is not a bad idea. Unless we really care about how much your application consume overtime (typically memory would not be an issue with the advance of CPU nowadays), otherwise the complexity can easily go off-course if not documented properly 😅



References:

[MDN documentation on Shared Worker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

[Shared Worker minimal example](https://github.com/mdn/simple-shared-worker)
