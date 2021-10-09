---
templateKey: blog-post
title: "UI frameworks and Media Elements \U0001F3A7"
date: 2020-06-02T02:51:27.119Z
description: "The blog post describes the problems I face when working with UI frameworks and Media elements in the web platform (specially video \U0001F3A5 and audio \U0001F3B5). I really am excited about this as it is the first solution that is totally owned by me without referring to any other sources of solution. I'm going to give a brief overview of problems I had at work and how I ended up create this solution. Thus, read on guys \U0001F4D6"
tags:
  - Axon
  - FE
  - Media Element
  - Media
---
[Accompany presentation](https://var-mse.netlify.app) 

> It's harder than you thought, easier than you think

First of all, let's define couple of terms before moving to the rest of the article:

1. [Media elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement): audio and video elements on the web
2. Frameworks: UI libraries that helps developers deliver slick user experience in scalable manner
3. [MSE](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API): Media Source Extension API helps developers to load data to media elements plugin-free (without Flash installed 🥳)

As of writing, I was working at Axon enterprise. The big mission is **"Write code, save life"**. Specifically, Axon provides solution to helps police officers make bullet obsolete which consists of hardware and software. Among Axon's software ecosystem, there is a very customized and sophisticated media player to help user working with media evidences in the web. By the time I wrote this post, I had approximately one year experience with it (as long as I had joined Axon). Our team was the owner of this package and I was the only engineer working on it as maintainer.

In short, our current media package was a tightly coupled binding between React, MSE and Media elements. Since none of us was super experienced working with these pieces of technology before. We made couple of critical mistakes:

1. We forced every state of media elements to be in React's world and make modification to media elements on state changes => We lost the capability to integrate with any assisting technology as they all interact with media elements tags directly on the web such as browser extensions, screen reader, touch-bar, et cetera. Besides, headaches came from update lifecycles was enormous that was not worth paying for in this style of architecture
2. We bloated our React's media store by having a bunch of unnecessary states which is not relevant to media experience such as fullscreen, client speed, playback speed, etc This made UI extension became really challanging. For instance, when we wanted to embed video player in certain custom fullscreen views, we had to inject fairly amount of code down the way to make that happens
3. We had "plug and play" media player. This means the client code only need to import one component and pass in certain props, this will result in a read-to-go media player. This approach prevented us from extending feature like hotkeys, custom event trackers,... since these components need to interact with our React's media store
4. We tied business logic into package level. This created a lot of pain for API consumers as they needed to get certain parameters that are very Axon's specific. Needless to say, this made our media players could not play normal media sources such as mp4, mp3, etc and reuse all functionalities from the control bar such as volume change, playbackRate modifier, etc
5. We did not understand IE11's media support very well. This leads to very nasty logic check to determine whether the media's ready to play at any points consistently (aka loading indicator is quite sucky)
6. We should have done a better job at documentation since the package has always been a cornerstone in Axon's product as most of our evidence and monthly usage goes for media evidence. The lack of codebase architecture, contribution guideline and API usage turned out to be complete disaster as I was among the few who has fair amount of knowledge to keep this package barely stable
7. We made testing extremely difficult with the current architecture. One of my favorite quote from testing hero Kent C. Dodds **["The more your tests resemble the way your software is used, the more confidence they can give you."](https://twitter.com/kentcdodds/status/977018512689455106?lang=en)**. We had some test coverage in place but mostly to check whether some mock function got called, this did not give me any confidence at all before shipping Axon's products to production.
8. We were tightly coupling [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) (which is one of the most famous MSE standards out there initiated by Apple, the another would be [Dash](https://en.wikipedia.org/wiki/Dash)) right into the media components (wrapper around native media elements). This violated SOLID and the cause of it was that we would not be able to extend media's capability to Dash relatively

We are done for the problems statement part. The media package has served our customer well to some extend. As the company scales up quickly, we definitely need a better solution to make sure developer experience and productivity work beautifully in harmony. That is why I decided to work on something completely new to solve my problem with this media package, make Axon's developers and customers happy (less WTF comes out of their mouth 🤪). I created the blueprint to make lives better.

![VAR MSE](/img/var_hls.svg "VAR MSE")

\
The image attachment above can be broken down into "understandable" parts as followings:

* Instead of forcing media elements states to be in sync with frameworks' media store. We did the exactly opposite. This might seems counter-intuitive at first. Most frameworks tutorials guided developers to have data model in memory and keep in sync up to web elements (exactly what we did with out current media package). Since media elements are interactive and complex ones that have their own states and interact with other assisting technology. By having according event listeners registered to the native elements, we are able to avoid the first problem listed above. Data always flow one way, we update media elements via their relative controllers, listen for changes dispatched by them and update frameworks' media store respectively to re-render related UI 🤩
* We should only store media's properties inside frameworks' media store and nothing more. This helps to centralize logic and avoid tightly coupling with any concrete media elements
* We are able to use any MSE implementation by have a transparent API for consumer code (autoBitrateEnable, currentBitrateIndex, bitrates). Internal implementation are hidden away from API usage as all they need to know is the interface and API usage
* This architecture promotes composability as its solely purpose was to bind frameworks, MSE and media elements. Sky should be the limit for any fancy media players UI designers will ever come up with 😆
* Testability is one strong benefit of this architecture since we can render frameworks' component tree into node.js in-memory DOM and test it. This should mimic as much as how media player would be used (there is a couple of gotcha as we need a real interactive player to test play method - e2e should come in very handy) 🤓
* The MediaComponent should ever receive a single mediaSource which can be MSE or normal mp4 in order to load media stream for media element. No more bloated props issue as listed above

With the architecture above, I was able to solve all problems I faced except one - IE11 loading issue. It will take years before IE11 goes completely vanished. Before that, we have to support it as much as we can. The problems with IE was that it's not responsive to certain events that are vital to indicate whether media elements has data to play or not (canplay, canplaythrough, waiting events are among them). Our previous engineers had to do a ton of workaround to mimic the behavior compared with other modern players. I spent couple of days trying to resolve this issue as clean as I could. I ended up first with the solution of detaching loading logic away from media elements and shift that to MSE instance. This works consistently but failed on normal media sources. Even though, we have not supported normal media sources yet but I wanted to **["aim far"](https://global.axon.com/company/values)**. The optimal solution was to have the snippet below to check on any events that required loading logic (progress, waiting, seeking events)

![Check Media Has Data](/img/timerange.png "Check Media Has Data")

It's very much readable, isn't it? 😁 [Try it yourself](https://react-rock-hls.netlify.app) on IE11 to see it works 😇

Error handling has always been something mistreated by most applications AFAIK. It's pretty tedious compared to fancy working features, but we need a way to let consuming code known what's going on internally and communicate effectively so that the UI can be updated as per demands. In the case of this media package, there are two big categories where error can fall into. They are network error and MSE error (due to internal error of relative MSE libraries). For the latter, we can't do anything more about it but to let client code know that some error came with MSE instance. With respect to network error, there are several scenarios thing such as unstable network, wifi change, network timeout, failed API call. Most of the time, these should be solved by retrying on the current loading segment until reaching thresholds (this should be configurable) 😎

Last but never be the lease is testability, how do we test any components that connected to our media store? This is pretty straightforward as all we need to do is render them all into the DOM, interact with it and assert that they works the way we expected. The simplest and meaning full test to make sure mute feature work should look like the attachment right below 👇. How hard can it be? 😃 (Since we are not able to load a video stream into our media player, that would require e2e test. That should not be a problem but involves a bit of setup. Since the media player and testing tools are sharing the same interface if they test via media tags or interact directly via media control components. It just works! 🤝)

![Volume test](/img/volumetest.png "Volume test")

I built a [mini Youtube clone](https://vue-mse.netlify.app/) video application in [Vue](https://vuejs.org/) in less than a day. This exemplify the effectiveness of the architecture 🎉

To error is human, it's the fact - without trial and error we will never be able to progress in life. I was completely new to media in the web, never written any lines of code related to media service. I had done nothing more than using video and audio tags directly from the web. At Axon, I was really grateful that the problems I faced mostly not available in stackoverflow (I couldn't copy and paste like most developers in the world would do - no offense 😆). Trying to keep an open-minded, experiment and see things work under various scenarios did cost many weekends of mine 😬\
\
To see the list of things that I have come up with without any helps from stackoverflow while being at Axon. Please visit this [link](https://namnguyen.design/tags/axon/) for the full list in case you are curious 😊

**Final thought:**

At the moment of this writing, I was not at the position at Axon to make direction for the media package project to go anywhere. It totally came out of my frustration with the current media package, I wanted to make lives better (customers, friends and developers), build something that I would personally like and use for the rest of my-life (as long as I'm still coding 😄). Life is all about challenging and pushing ourselves 😎

🎉🎉🎉 Be well, Be happy 🎉🎉🎉
