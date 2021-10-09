---
templateKey: blog-post
title: "Forking create-react-app at QUOINE - part 1 \U0001F4BB"
date: 2019-01-04T01:55:55.957Z
description: "This is my series of blog posts on how I did successfully transition from the ejected version of the create-react-app version 1 to forking version of create-react-app v2 specifically at QUOINE. \U0001F60A"
tags:
  - create-react-app
---
**This is a four parts of the process:**

1. [Remove unnecessary stuff included in the original create-react-app v2 tooling](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-1-%F0%9F%92%BB/)
2. [Customize Jest configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-2-%F0%9F%92%BB/)
3. [Customize Webpack development configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-3-%F0%9F%92%BB/)
4. [Customize Webpack production configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-4-%F0%9F%92%BB/)

The create-react-app version 2 from Facebook's core team has upgraded vast majority of key technologies included such as:

* **Webpack version 4**
* **Jest version 23**
* **Babel version 7**
* **Eslint version 5**
* **CSS module support**
* **Typescript support**

There are few things that I decided to remove from the forking version of create-react-app to keep it lightweight. First of all, Typescript is supported in version 2 so that there is a script that check the existence of typescript files in the repo anytime we run react-script. This actually is not necessary since we don't use Typescript anywhere in our application. Because of this, I deleted this file and anywhere this module is used.

![Verify Typescript setup editor screenshot](/img/cra-typescript-support.png "Verify Typescript setup")

Next, I looked at the current eslint setup of CRA's ejected version at QUOINE and found that the linting rules are not consistent to the one used by react-script. The versions are mismatched (QUOINE used version 4 and CRA used version 5). And CRA uses a minimal linting rule so-called "eslint-config-react-app" while QUOINE leveraged a eslint setup from airbnb. Hence, there was no need to keep Eslint configuration inside forking version of CRA. I then removed them all from package.json and from webpack configuration for linting before transpiling.

![Eslint removal from package.json screenshot](/img/cra-eslint-removal.png "Eslint removal from package.json")

![Eslint removal from webpack configuration screenshot](/img/cra-webpack-eslint-removal.png "Eslint removal from webpack configuration")

**Conclusion:**

The removal of these made the forking version of CRA v2 become much more light way as it has less things to download and fewer to check at runtime.This would more or less speed up the download and development time of developer at QUOINE while using this forking version of CRA. 🎉

- - -

The forking version of create-react-app is hosted at this [repo](https://github.com/willnguyen1312/cra-fork) before moving to under QUOINE's Github organization private repositories.
