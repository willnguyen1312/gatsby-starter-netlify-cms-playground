---
templateKey: blog-post
title: "How to build a simple drag and drop folder explorer in Vue \U0001F389"
date: 2021-05-21T06:18:21.943Z
description: "In this post, I would like to share my recent prototyping on One Drive clone application. This is meant for facilitating one of our team feature at Axon so-called Cases. Stay tuned and read on guys \U0001F60E"
tags:
  - Vue
  - Axon
  - Folder
---
As of writing, I'm working on a feature called hierarchy folder in Cases at Evidence.com application. You might might heard that before [from our main web site](https://global.axon.com/products/evidence). Our application helps customers to organize various kind of evidence (image, document, audio, video, et cetera) in our platform. These evidence could be organized in something called **Case** which is meant for serious investigation on certain crimes. Our customers really want to have a similar experience in working with folders in Cases as they do in their local machines (Explorer in Windows and Finder in Mac). This is very much identical to what I was working on previously from [this post](https://namnguyen.design/blog/2020-06-02-ui-frameworks-and-media-element-%F0%9F%8E%A7/). Below is a short demo:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/PW_pta6OUjM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I am going to use Vue in this prototyping but the same technique can be applied across frameworks (at Axon, we use React for everything if you ever wonder 😛). I also use [Vite](https://vitejs.dev/) for this demo since it's my favorite go-to tool for prototyping of any kinda application. If you don't know it, please give it a try. It's built by the same mastermind behind Vue.js - [Evan You](https://twitter.com/youyuxi). Alright, enough talk and let's get down to business 😎

First of, we need to extract the file paths from the list of files on drop. We can read more about it [here](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files) on MDN blog. Hierarchy folder is typically a tree, browsers' Web API already gives us [the relative path](https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath) which is a vital element to construct a tree. All we need to do is providing a little conversion function namely **pathsToTree** like so:

![Paths to tree](/img/pathstotree.png "Paths to tree")

Our tree is a multi root tree so that we need to prepare a virtual root node namely **Root** in my application. We also need to keep track of current path in order to display exactly all items located inside - aka we need to compute the current tree. Here is a little function namely **findNodeFromTree** doing exactly that

![Find node from tree](/img/findnodefromtree.png "Find node from tree")

And here is how we are going to render this tree

![Render folder tree](/img/renderfoldertree.png "Render folder tree")

As you can see, it's as simple and render all node's name with a little prefix icon folder / file depends on what kind of evidence we are dealing with. These elements are also draggable, we are going to get into that shortly. Right now, in order to render different path. We need to handle click event on each folder item. This will trigger the re-computation description above which leads to UI updated accordingly

[Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) has exactly 8 events to look at. For this specific use case, we only care about several ones in order to let drag and drop available on each item if available. Similar to how One Drive handle items, if an item is a folder, then it can have nested elements. We could do that by attach node's path into [data transfer object](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) which will be available to drop event later. Now it comes the interesting part, we need to reconstruct the sub tree paths as it's now moved to different place. We need to that recursively so that our application can continue to work as expected. Here is how I did it 😇

![Update node path](/img/updatepath.png "Update node path")

Thanks to Vue's reactivity system in place. Everything is trackable by default and we can do mutation freely while trusting that Vue's taking care of rendering process beautifully. And there we have it guys, a minimal but complete drag and drop folder explorer in Vue. Free free to sneak around the source code, open issues / questions if needed (I will be super happy to respond 😍) and play with it [here](https://drag-drop-finder.netlify.app/). Below is a little demo to show off how it works

<iframe width="100%" height="500" src="https://www.youtube.com/embed/-v9N9Xj0Uos" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

❤️❤️❤️ Be well, Be happy ❤️❤️❤️
