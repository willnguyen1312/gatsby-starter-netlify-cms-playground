---
templateKey: blog-post
title: "Introducing React-Zoomable-Media \U0001F52E"
date: 2019-10-29T07:57:44.007Z
description: "At Axon, we have handled a giant number of videos and images every day. The customers have been able to do basic media manipulation such as rotate the image, manipulate the bit data to give image different contrast and brightness, video can be played, paused, muted, unmutated, going frame by frame, fullscreen support. One of the hottest \U0001F525and advanced \U0001F5E1features just arrived in production in our October 2019 major release.  \U0001F50E\U0001F50E\U0001F50E THE ZOOM \U0001F50E\U0001F50E\U0001F50E "
tags:
  - React
  - Axon
  - Media
---
The zooming functionality has been always one of our customer's most wanted features. As our customers are police officers, the need for advance viewing media evidence is a must-have. After the media have been recorded, they need to be processed by the BE team at first since the majority of browsers are only capable of rendering well-known media format like jpeg, png for image and mp4 for video - get more inside [here](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)

At Axon, we have different squads handle different aspects of product development. Beginning of 2019, Axon decided to invest heavily on enhancing our products' viewing functionality. One of the first thing comes to mind to the zooming feature. At first, we have looked up online to figure out whether or not already available and battle-tested solution for us to integrate with our system. The biggest name was [Cropper.js](https://fengyuanchen.github.io/cropperjs/), it was developed for years, well-tested and used by thousands of projects worldwide. It's initially just a Jquery's plugin then become a standalone solution. Cropper.js is a fantastic library with ton of configuration support variety of business cases. We thought it would be a great choice for the problem we face at Axon with couple of drawbacks. Cropper.js does not support video zoom, only canvas and image were supported. We decided to go for temporary solution that we would extract a frame out of a video and then feed it to Cropper.js to do the zooming. Since the first internal demo of zooming at Axon, Cropper.js had served us very well and ready to go live in August 2019 release. Couple of week later, as we delivered fullscreen support for both image and video, we need to scale the image from normal screen to fullscreen along with current zoom aspect. This is he point where we found out that Cropperjs could no longer help us fight the problems we have at Axon. The zoom canvas could not resolve itself responsiveness as the parent image size change from normal size to fullscreen size, so does portrait/landscape mode switching.

There it comes the birth of new zooming library at Axon, I called it [react-zoomable-media](https://github.com/willnguyen1312/react-zoomable-media) (the author of this library's girlfriend named it this way 💝). The library supports the following features (mostly solve the problem we faced at Axon)

* Image zoom
* Video zoom
* Crop image
* Keyboard navigation with focus diagnostic
* Responsiveness baked in
* Support any pointer devices (mouse, fingers, pen, etc)
* Accessibility support

Here is a [link](https://react-zoomable-media.netlify.app/) to the demo 😎

The core concepts was taken to integrate with Axon's codebase standard and UI's guideline. It now have been used to serve thousands if not millions of people globally. That is what we do at Axon - **Write Code Save Lives 😊**
