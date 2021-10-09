---
templateKey: blog-post
title: "How to integrate  PDFTron with UI frameworks \U0001F4C3"
date: 2021-03-10T11:58:28.558Z
description: "Recently, I have an opportunity to work with document in the web. In this post, I would like to share my experience on the integration process of PDFTron to React application. Stay tuned and read on guys \U0001F60E"
tags:
  - React
  - Axon
  - PDFTron
---
Last year, I received the requirement at work to develop document viewer in the web. Previously, we have used [PDF.js](https://mozilla.github.io/pdf.js/) which is de-facto go-to solution to view pdf document on the web. It's a great tool for viewing pdf file on the web but limited to view functionality only, and we need a whole set of new features for our customers. In the process of researching different vendors, [PDFTron](https://www.pdftron.com/) has been so far the most outstanding vendor which offers a plenty of features and super helpful support from solution engineer team. Let's go through the process of how we can integrate any UI frameworks with PDFTron library. I am going to use React but the main concepts should be transferable across frameworks. Here is a little [demo](https://pdftron-playground.netlify.app/) to play around with 😎

The [accompany repo](https://github.com/willnguyen1312/pdftron-playground) is based on [the original repo](https://github.com/PDFTron/webviewer-custom-ui) maintained by PDFTron engineer with several tweaks and notes in order to develop production ready application. First and foremost, it's very important to note that PDFTron library will inject their code into global window variable since [their assets cannot be bundled](https://www.pdftron.com/documentation/web/get-started/npm/). This requires us to develop our application in fairly different way since all dependencies are only available via window object instead of being scoped thanks to bundler tools like Webpack or Rollup. We need to include old-school script tags to load our dependencies at runtime and start using them at runtime. In typical single page application, index.html file is the place where we would inject any custom scripts. We could do that by either manually add several scripts tags as the attachment below or config custom bundler's tools to inject these scripts at build time. Please note the versioning since this enable us to [leverage the cache](https://www.pdftron.com/documentation/web/faq/load-webviewer-files-no-cache/) instead of downloading the same version again and again 😜

![PDFTron scripts](/img/pdftron_scripts.png "PDFTron scripts")

First and foremost, PDFTron has one of the most excellent [API doc](https://www.pdftron.com/api/web/index.html) I have ever seen and really good SEO so we could easily get what we need from any search engines. Getting-started is the most difficult part of any integration, it's important to understand that PDFTron requires [these components](https://github.com/willnguyen1312/pdftron-playground/blob/f27cd3ea91490c6944d9b4ab45d1a55214763212/src/App.tsx#L30-L34) to be available in order to do its magic:

* The scrollViewer element
* The viewer element
* The worker path to be set in order to load resources dynamically

Next up, we need to set [several options](https://github.com/willnguyen1312/pdftron-playground/blob/04e9ac5ed3bab29142db2416a0effaba4872d080/src/App.tsx#L37-L41) in order to tell PDFTron our preferable settings. Since PDFTron is built with framework-agnostic in mind. It does not include any UI frameworks in its bundle but raw web technologies (HTML, CSS and JavaScript). In order to make it works with our desirable UI frameworks, we need to hook into their [events callback systems](https://github.com/willnguyen1312/pdftron-playground/blob/04e9ac5ed3bab29142db2416a0effaba4872d080/src/App.tsx#L45-L48) to extract necessary properties and store in our state management system and render UI accordingly. For those who prefer fully features demo, please visit this [repo](https://github.com/PDFTron/webviewer-ui) where PDFTron engineers have put a lot of effort to integrate React with their SDK to resemble their [demo page](https://www.pdftron.com/webviewer/demo/) which is an iframe under the hood 😄

Final note, someone might feel tempted to acquire PDFTron version via this syntax\
`const pdftronVersion = require("@pdftron/webviewer/package.json").version;`

This should be avoided since bundle tool like Webpack will include a whole package.json file into the final code which leads to a security risk of exposing all packages to the public. This leads to vulnerability exploitation. We could avoid that by defining environment variable via plugin such as [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) from Webpack. Thus, be safe 🏥

And there you have it guys, working with PDFTron in the web can be tough at the setup step since it requires different development approach compared to modern module resolution. Once we get a hang of it, there is nothing stop you from achieving what you want with PDFTron's fantastic SDK. It's so far my favorite document solution and we are going to make a very good use of it at Axon 🎉 

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
