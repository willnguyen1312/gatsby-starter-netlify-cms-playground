---
templateKey: blog-post
title: "How to work with video overlay on the web \U0001F389"
date: 2021-01-05T04:04:37.390Z
description: "I have worked with various video features in the last couple of years. One of the things I found that cause a lot of headaches to my colleagues is video overlay. In this post, I would like to share my lesson learnt from the past and how I think working with video's overlay is not as hard as many thought. Stay tuned and read on guys \U0001F60E"
tags:
  - React
  - Axon
  - Video
---
First of all, let's have a closer look at what video overlay is to make sure we are all on the same page. Video overlay is any extra UI we draw on top of the video content. The actual video content is very different from video element itself in the web as it has **object-fit: content** built in by default. This makes the video element's dimensions and the actual video's content are separated most of the time as we could not easily get perfect aspect ratio for our application. The photo worths a thousand words as below 🥳

![Video Overlay](/img/video_overlay.png "Video Overlay")

The red rectangle denotes the actual video content while video element takes up a full box outside. At Axon, we have delivered several features with respect to video overlay such as display speed of in-car camera, current selected audio for multi-cameras view at a time, et cetera. In the past, we have picked up several solutions in chronological order as below:

1. Hard-coded values - this could not scale very well for all kind of video with various aspect ratio
2. Ton of CSS breakpoints styling for different visualization on many screen sizes
3. Add SVG element displayed on top of video - this requires a lot of magic numbers and inconsistent with IE11

None of the approach is scalable for us and as of writing we are in the process of rewriting this features from scratch. Here is [a quick demo](https://video-overlay-demo.netlify.app/) for those who are curious about the final result 😄. Otherwise, let's me walk you through the detail of my solution.

Firstly, we need to have several pieces for our application to work: the wrapper element, the video element and the overlay element will be defined later

![Video Overlay Initial Code](/img/video_overlay_initial_code.png "Video Overlay Initial Code")

Here is comes the important part - overlay element

![Video overlay element](/img/video_overlay_overlay_element.png "Video overlay element")

At this point, the key part is to get the right video content dimension so that the overlay element can be sized and center on top of the video element. In order to achieve this, we need to know dimensions of wrapper element and video's actual width and height. We can accomplish that by hooking into **loadedmetadata** event as this is the moment where we can read meta data our of video element. From here, we need to do a bit of Math to calculate our video dimensions based on aspect ratio of our video and wrapper element. We need to derive values based on wrapper element's sizes as below:

![Video Overlay Loadedmetadata](/img/video_overlay_on_loadedmetadata.png "Video Overlay Loadedmetadata")

And there we have it, the video dimensions equals exactly what being displayed on the screen 😄. Last but never be the least is how we handle responsive ness on screen sizes change, this can be easily attained by adding extra event listener on **resize** event as below 😬

![Video Overlay On Resize](/img/video_overlay_on_resize.png "Video Overlay On Resize")

You could clone the repo and see inspect the code with pleasure [here](https://github.com/willnguyen1312/video-overlay) 👻\
\
And there we have it guys, this overlaying technique can be achieved across frameworks (I used React in this demo but it's a piece of cake in any UI frameworks out there). From here, we can just render about anything inside overlay element at ease without any extra burden on maintainability. I'm very exited to share this lesson learnt with you guys and hopefully it will fulfill part of your life one day 🤗

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
