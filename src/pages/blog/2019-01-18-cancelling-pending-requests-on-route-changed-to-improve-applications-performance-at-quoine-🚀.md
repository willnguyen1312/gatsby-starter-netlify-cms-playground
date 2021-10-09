---
templateKey: blog-post
title: "Cancelling pending requests on route-changed to improve application's performance at QUOINE \U0001F680"
date: 2019-01-18T08:10:25.560Z
description: "This blog post is describing the solution I proposed at QUOINE to prevent on-going API calls stacking up the networking queues --- Improve application's performance \U0001F3CE\U0001F3CE\U0001F3CE"
tags:
  - blocking-api-calls
---
Initially, the situation was that whenever users navigate too fast among difference routes. This process made a ton of API calls that stacking up the browsers' networking queues. As per HTTP 1, browsers can only support certain amount of concurrent requests at any given time (source - [max parallel http connections in a browser](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser)). Even though with HTTP 2, that won't be the case as one single TCP connection for all requests - it is still best to cancel unneeded requests for optimizing user's bandwidth. As the attachment show below how bad the situation was at QUOINE in production.

![Blocking API calls screenshot](/img/blocking-api-calls.gif "Blocking API calls")

On fast network, the situation could be somewhat mitigated. Unfortunately, we never live in that such perfect world. In reality, the internet is very much unstable and varies mostly among slow and medium connection quality such as 3G on mobile devices. Consequently, this process was a huge waste on users' bandwidth and have terrible effect on user experience as data could not be fetched as quickly as possible due to blocking API calls.

The solution of course was to prevent the unnecessary API calls blocking the necessary ones. At QUOINE, we used [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make networking requests to the server together with well-known [fetch polyfill](https://github.com/matthew-andrews/isomorphic-fetch) from the community due to browser's [Fetch API support for IE 11 and below](https://caniuse.com/#search=fetch). There were two solutions came up at that time for us to evaluate:

1. Switch to [Axios](https://github.com/axios/axios) library which has wider support due to [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) backed behind with native built-in cancellable requests and Promise's specification compliance.
2. [AbortableController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to the rescue

The first solution seemed to be very reasonable for me at first as axios is very lightweight and it's a promise-based API. Unfortunately, there is a several points needed to addressed if I chose axios instead of native Fetch API.

* Axios makes requests and return as transformed JSON data by default. And if we want to add some customization, we need to do a bit more of configuration. Instead, Fetch API requires us to manually transform data ourselves - `response.json()` for instance
* At QUOINE, our business requirement does not require us to support IE anymore since less than 3% of our customers were using IE 11 and below.

Eventually, we decided to go for AbortableController. There are few key things in our solution as demonstrated below:

First, we need to create a hub for centralizing our API requests with respect to cancellation mechanism. Be default, the requests will be cancel on route changes excepts on special cases such as fixed components that does not need to be re-rendered. The attachments below demonstrates how that process got done: 😊

Central hub - responsible for generating new AbortableController and cancellable token respectively 

![Abort Controller code image](/img/abortcontroller.png "Abort Controller code")

<br /> 

Pass option to uncanceled requests on fixed components such as navbar:

![Uncanceled requests code image](/img/none-cancel-request.png "Uncanceled requests code")

<br /> 

Cancel request on route changed

![Cancel request on route changed code image](/img/cancel-request-on-route-changed.png "Cancel request on route changed code")

<br /> 

Config fetch api call based on option passed

![Fetch configuration code image](/img/fetch-configuration.png "Fetch configuration code")

<br /> 

**Conclusion:**

The result turned out to be stunning as any unnecessary requests won't blocking API requests on current route anymore thanks to the appliance of AbortController. Hence, the users won't have to wait any more seconds to get the meaningful content on the screen. The new code make the process of data fetching more efficient, bandwidth optimization and reduce heavy load on server due to no need to process any useless API requests - 🎉  🎉  🎉 

![None blocking API calls image](/img/none-blocking-api-calls.gif "None blocking API calls")
