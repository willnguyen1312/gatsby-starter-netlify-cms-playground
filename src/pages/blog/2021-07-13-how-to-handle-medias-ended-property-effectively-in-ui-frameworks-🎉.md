---
templateKey: blog-post
title: "How to handle media's ended property effectively in UI frameworks \U0001F389"
date: 2021-07-13T02:56:48.533Z
description: "Previously, I have described my approach toward \"UI frameworks and Media Elements \U0001F3A7 \" from architecture point of view. It has been proven to be battle-tested at Axon with very minimal maintenance cost. I never found a time to go over some details since it's not documented anywhere in the web AFAIK including MDN doc. Lately, some colleagues asked me about how I came with with certain implementation on ended property. I think it's a good opportunity to write another blog about how I did it. Stay tuned and read one guys \U0001F60A"
tags:
  - React
  - Axon
  - Media
---
In case you miss [my previous post](https://namnguyen.design/blog/2020-06-02-ui-frameworks-and-media-element-%F0%9F%8E%A7/) about how to work with media elements and UI frameworks on the web. Please spend sometimes to read it before continue with this one for understanding 🙂

The question I got from my colleagues was on how to keep [ended](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended) state **in sync** with media's property. I did not go for [ended event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event) but [play](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event), [pause](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event) and [seeking](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event) events for the following reasons:

1. Ended event only gets fired when playback or streaming has stopped because the end of the media was reached or because no further data is available - reference from MDN doc. And, browsers actually dispatch pause event before ended event at the end of media
2. We need a way to keep track of ended property on change

Let's see how the three events listed above solve these two problems in a very performant and intuitive ways

Firstly, as our media provider context already has a dedicated handler for handling pause event. Given my above observation, pause event is even more responsive than ended event which serve only a subset of purpose. If we register extra ended event callback, the browsers will eventually fire two events. This will cause our React application to re-render twice instead of one which is bad thing IMHO

Secondly, the ended event does not get fired on ended property changed. We still need a way to keep track of this change. Typically, a user would interact with media element via play,  pause and seeking events very often. And, I think ended event is there just for semantic meaning. It would be nice to have something like \`endedchange\` similar to \`volumechange\` event - but it's what it's 😅. Thus, I don't have to wire up the above event listeners for good.

Someone with experience with media might wonder why play event is there instead of  having only seeking event is enough - since play at the end of media will trigger seeking event too 😜. I used them both for a reason of responsiveness. Since they both play important roles in keeping track of **seeking** and **pause** properties of media element. Why would I choose to track **ended** on both of them instead of just **seeking** seems to be enough. This is for because on Chrome based browsers and Safari, the seeking event will be fired before play event and vice versa on Firefox browsers. Hence, trading few extra keystrokes for responsiveness of UX is not a bad idea - someone might call it a micro performance optimization. It's how [Inferno](https://github.com/infernojs/inferno) library stays one of the fastest by doing a lot of small micro performance optimizations underneath hood. AKA - **Greatness is a lot of small thing done well 😎**\
\
We could [play around with the code here at the console](https://github.com/willnguyen1312/react-media-playground/blob/main/src/App.tsx#L33-L36). I also host a build version of it in Netlify via this [link](https://react-media-playground.netlify.app/) 😁. And the attachment below is the demo 🎉

<iframe width="100%" height="560" src="https://www.youtube.com/embed/mzdwN14vY9o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

And there we have it guys, I really wish one day MDN would work on their doc to make it more comprehensive to their users. As of now, there are few more places I faced but never have time to write about it such as waiting event which does not support well in IE11 but [MDN says yes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event#browser_compatibility). Good bye for now and until next time guys 🤘

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
