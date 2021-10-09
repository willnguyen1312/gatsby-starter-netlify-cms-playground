---
templateKey: blog-post
title: "Reverse-engineering PDF search algorithm from Firefox \U0001F4DD"
date: 2020-06-01T04:56:11.044Z
description: "AXON's mission is to write code, save life. We provides solution for police officers to work on daily basic tasks. The most common task would be collect different kind of evidences to work on cases. This ranges from audio, video, document, et cetera. For years, our PDF viewer's capability is very limited as it does nothing more than render static pdf page as image. Up until last year, as our customers would like to have advanced functionalities added to the current PDF viewer. The most wanted one is search functionality. This post goes into details on how I did that \U0001F4DA"
tags:
  - Axon
  - React
---
At AXON, we use React extensively for all of our web applications. And , pdf.js from Mozilla Firefox has always been de facto solution to go for whenever someone consider adopt one battle-tested PDF solution for their product. It has been used by vast number of companies, browser extensions and libraries (open source and comercial). We've used [react-pdf](https://github.com/wojtekmaj/react-pdf) as our React's binding resolution for rendering PDF document on the web page. As we looked up into the project to see whether search functionality is supported. As it turned out, searching has never been part of the project's roadmap. [Highlight text on the page](https://github.com/wojtekmaj/react-pdf/wiki/Recipes#highlight-text-on-the-page) is the furthest we can get with react-pdf 😅 At first, it seems like a good starting point and I could adopt the recipe into our pdf viewer with ease 🙃

As suggested by the react-pdf's recipe, all I neeeded to do was to extract the text content from each pages, then start a simple search to figure out index position for highlighting on each pages and shift that work to react-pdf to render on the page. This is where the surprise came, as PDF's content structure is not fixed. This means the creators of pdf can have the document constructed however they like. This leads to inconsistency for our searching algorithm. As we could see from the attachment below, The word **2020** are split into two elements instead of one even though they are on the same row. This makes it really hard for searching on multiple rows. Simple searching algorithm cannot work in this case, we definitedly needed a better shot.

![PDF FF](/img/pdf-ff.png "PDF FF")

As we could see that Mozilla Firefox default pdf viewer could detect the keyword search and highlight them correctly. This made me wonder how they did it and properly we can adopt their searching strategy for AXON's customers. Fortunately, they've hosted the [repo](https://github.com/mozilla/pdf.js/) on Github under mozilla organization. It was really intimidating at first to look at their solution, it's all very imperative code with class based implementation, even buses architecture, et cetera 😱



I kept reading reading and reading 🔖, I went from view layer to controller and services. It took me a whole weekend to get a hang of how code run in their sample project. Finally, it's really only one file that I should pay attention to which is [text_layer_builder.js](https://github.com/mozilla/pdf.js/blob/58797103273e9a615f87c96dd899290026bbdf47/web/text_layer_builder.js). All I needed to do was to concat all pages' content into one giant string and do simple search to get how many matches how have. Then come the trickiest part, on every match, we need to keep track on beginning, middle and ending of each match. That's the case we have with **2020** keyword above. 

![PDF Search](/img/pdfsearch.png "PDF Search")

In order to have things work in harmony with react-pdf. We needed two interfaces, the first one is PageMatch which store a page number and list of indexMatches to indicate the beginning index of the match. The second one is the individual Match on page. This will help out the highligh logic inside react-pdf, as we needed to determine which part of the element needed to be highlighted

And there we have it, searching functionality added on top of react-pdf's rendering engine. This features has served our customer very well since our first release in the end of Q1 2020 🎉🎉🎉🎉🎉🎉🎉
