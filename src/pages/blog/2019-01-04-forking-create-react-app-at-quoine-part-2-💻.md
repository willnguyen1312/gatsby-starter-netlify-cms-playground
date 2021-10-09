---
templateKey: blog-post
title: "Forking create-react-app at QUOINE - part 2 \U0001F4BB"
date: 2019-01-04T02:49:19.192Z
description: "This is my series of blog posts on how I did successfully transition from the ejected version of the create-react-app version 1 to forking version of create-react-app v2 specifically at QUOINE. \U0001F60A"
tags:
  - create-react-app
---
**This is a four parts of the process:**

1. [Remove unnecessary stuff included in the original create-react-app v2 tooling](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-1-%F0%9F%92%BB/)
2. [Customize Jest configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-2-%F0%9F%92%BB/)
3. [Customize Webpack development configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-3-%F0%9F%92%BB/)
4. [Customize Webpack production configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-4-%F0%9F%92%BB/)

The way we structure our application at QUOINE is not something that natively supported by the original CRA. Specifically, CRA only support a single application under one project folder. Instead, we have up to several apps located right under one repo. Unfortunately, our previous engineer team did not structure our application as monorepo style popularised by project and Facebook's React and Babel. We did as below instead:



![QUOINE FE code structure screenshot](/img/quoine-fe-code-structure.png "QUOINE FE code structure")



Sadly, this is how we structure our **applications**. Instead of having one application, we decided to group them all this way and import modules circularly which make things extremely hard to scale in term of productivity. The technical debt is so huge so that it will take a lot of effort to re-architect this kind of application. Later, I might write another series of blog posts on how we revamp our codebase structure at QUOINE. For now, let's focus on the forking CRA testing part.

In order to make Jest understand the current module mapping system at QUOINE. I have to modify the current configuration of Jest to map all absolute path to relative path since our front-end engineers did apply aliases in webpack's configuration. The new module resolvers are mapped as below:

![CRA Jest configuration screenshot](/img/cra-jest.png "CRA Jest configuration")

There is another key point to node here is that every application is hosted separately. Because of this, I have to modify the test script so that the package.json npm's script point to the right location of react-script test script.

![CRA test script packge.json screenshot](/img/cra-jest-packge.png "CRA test script packge.json")

**Conclusion:**
With a few modifications in Jest's setup configuration. I am able to get back the original version of awesome Jest's test running in our application. The result is rewarding as our beloved Jest now only run on related files instead of executed every single test as showed below - 🎉

![Awesome Jest test screenshot](/img/cra-awesome-test.png "Awesome Jest test")

- - -

The forking version of create-react-app is hosted at this [repo](https://github.com/willnguyen1312/cra-fork) before moving to under QUOINE's Github organization private repositories.
