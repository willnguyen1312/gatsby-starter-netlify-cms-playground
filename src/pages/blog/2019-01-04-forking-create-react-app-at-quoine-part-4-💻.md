---
templateKey: blog-post
title: "Forking create-react-app at QUOINE - part 4 \U0001F4BB"
date: 2019-01-04T04:29:56.791Z
description: "This is my series of blog posts on how I did successfully transition from the ejected version of the create-react-app version 1 to forking version of create-react-app v2 specifically at QUOINE. \U0001F60A"
tags:
  - create-react-app
---
**This is a four parts of the process:**

1. [Remove unnecessary stuff included in the original create-react-app v2 tooling](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-1-%F0%9F%92%BB/)
2. [Customize Jest configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-2-%F0%9F%92%BB/)
3. [Customize Webpack development configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-3-%F0%9F%92%BB/)
4. [Customize Webpack production configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-4-%F0%9F%92%BB/)

The final part of this series is devoted for configuring webpack's production mode for building web applications at QUOINE. Here is our FE's current codebase structure at QUOINE:

![QUOINE FE code structure screenshot](/img/cra-webpack-prod.png "QUOINE FE code structure")

The way we were architecting our apps is as the followings:

* The core app directory contains all shared components and bootstrap code for Redux and React-Router boilerplate
* Other applications would import reusable code from core app folder to apply in their own application with some tweaks if needed
* Every application has its own .env files for webpack to read at runtime

The problem can be easily seen above as we had multiple public folder that needed to be copied over instead of just one folder. I leveraged [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) to merge them all into one final build and config specify path for them like so:

```
  selfPublic: resolveApp('./public'),
  appPublic: resolveApp('../core/public')
```

Beside this, we have another important trick to enhance our Search Engine Optimization at QUOINE. Since most of crawlers could not understand content rendered dynamically by Javascript and mostly just understand static content from Html file. QUOINE's main product is a trading platform application which has support for thousand of currency pair. For each pair to be read and indexed by search engine bot, we need to create a specific html with according meta tags and descriptions for it. That is why we created a SEO plugin for our webpack's production build. We did have this plugin tightly-couple with react-script's build step unfortunately. I decided to move it to the root folder to be read at build time, inspired by how Jest's runner lookup for [setupTestFrameworkScriptFile](https://jestjs.io/docs/en/configuration.html#setuptestframeworkscriptfile-string) in its configuration option.

![CRA SEO plugin screenshot](/img/cra-seo-plugin.png "CRA SEO plugin")

**Conclusion:**

Finally I successfully made this happened. It was such a harsh journey to spot out all the differences between ejected version of QUOINE's CRA and original Facebook's CRA version. It was absolutely rewarding after all. I got to know what is actually under the hood of this amazing tool with more than 60k Github ⭐️. And guess what, the build time received a huge boost thanks to Webpack 4 and Babel's latest features and improvement on performance. The run time of build process dropped from ~12 minutes to less than 2 minutes. It had always been such a pain for us to do any hotfix and quick releases in production before because all CI/CD process caused such a major pain in the butt. It stopped from this moment of shiny forking version of CRA. 😇

>  No pain no gain.   🎉

![Awesome QUOINE FE build screen shot](/img/awesome_build.png "Awesome QUOINE FE build")

- - -

The forking version of create-react-app is hosted at this [repo](https://github.com/willnguyen1312/cra-fork) before moving to under QUOINE's Github organization private repositories.
