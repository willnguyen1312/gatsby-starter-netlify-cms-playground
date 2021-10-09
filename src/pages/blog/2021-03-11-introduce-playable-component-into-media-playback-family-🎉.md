---
templateKey: blog-post
title: "Introduce Playable component into media playback family \U0001F389"
date: 2021-03-11T10:39:05.474Z
description: "Recently, my colleagues have asked me whether it's possible to reuse the same set of components which are in use to power media players without involving actual media element. At first, this sounded crazy to me but it then turned out to be one of the most brilliant ideas  I have ever received. In this post, I would like to share my experience on the process of enhancing media package to playback any kind of time series data. Stay tuned and read on guys \U0001F918"
tags:
  - React
  - Axon
  - Playback
  - Media
---
Previously, I did share [my invented media architecture](https://namnguyen.design/blog/2020-06-02-ui-frameworks-and-media-element-%F0%9F%8E%A7/) to work in harmony with UI frameworks. Lately, I have received an fantastic request from one of my colleague to playback some time series data without involving actual media element. Challenge accepted! Since our media package makes use of [Bridge pattern](https://refactoring.guru/design-patterns/bridge) underneath the hood. As long as I satisfy an Implementation's interface the way audio and video elements do. Everything should work as expected. There it comes the birth of Playable component. Here is the core concepts that power the component:

* The component renders one media-like element without involving any media sources. This helps to reuse all properties from [native media element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) such as currentTime, playbackRate, etc
* The media-like element's properties needs to be hijacked (read-only properties such as duration and paused) to mimic media's playback behavior
* The component needs to register all necessary event listeners the way video and audio elements do so we can have reactive system in place

Let's go over them one by one. First, we need to hijack media element on initial start up as following and clean up on component's unmounted phrase.

![Playable Hijack Media](/img/playable_hijack_media.png "Playable Hijack Media")

Next up, we will create an internal store to take control over these properties explicitly instead of letting browsers have them.

![Playable Hijack Properties](/img/playable_hijack_properties.png "Playable Hijack Properties")

Then, we need to mimic the [time update event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event) from browsers so that our players can be played as if it's involving actual media. By default, I use 4 times per second to imitate 250ms from browsers' behavior. 

![Playable Hijack Playback](/img/playable_hijack_playback.png "Playable Hijack Playback")

Lastly, we need to register all necessary events listeners to media-like element in order to active reactive system from React. Please note that I put the element into hidden mode since we don't want our screen reader discover this element since there is no such audio 😂

![Playable Hijack Events](/img/playable_hijack_events.png "Playable Hijack Events")

You guys can play around with the demo in [](https://codesandbox.io/s/media-player-with-xstate-demo-mo5t1)[this CodeSandbox link](https://codesandbox.io/s/media-player-with-playable-demo-heq8i) 🥳

And there we have the Playable component guys. Not only this components helps us playback any time series data but also overcome some limitation of browsers such as [maximum playbackRate](https://stackoverflow.com/questions/30970920/html5-video-what-is-the-maximum-playback-rate). I'm super excited to see this comes into place even though I never thought it would be possible in the first place. Super happy to see things work out beautifully the way we never expected 😍

\
❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
