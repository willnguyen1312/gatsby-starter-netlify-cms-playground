---
templateKey: blog-post
title: "Forking create-react-app at QUOINE - part 3 \U0001F4BB"
date: 2019-01-04T03:25:10.320Z
description: "This is my series of blog posts on how I did successfully transition from the ejected version of the create-react-app version 1 to forking version of create-react-app v2 specifically at QUOINE. \U0001F60A"
tags:
  - create-react-app
---
**This is a four parts of the process:**

1. [Remove unnecessary stuff included in the original create-react-app v2 tooling](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-1-%F0%9F%92%BB/)
2. [Customize Jest configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-2-%F0%9F%92%BB/)
3. [Customize Webpack development configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-3-%F0%9F%92%BB/)
4. [Customize Webpack production configuration](https://namnguyen.design/blog/2019-01-04-forking-create-react-app-at-quoine-part-4-%F0%9F%92%BB/)

At QUOINE, we were using CSS module across our applications. Needless to say. the biggest drawback of this approach is dynamic property configuration and lack of theming support. The workaround we did was to leverage inline style wherever it is necessary and using css variables for theming. We had to trade performance for convenience and luckily we never have to support IE11 so that we are in safe mode to apply CSS variable - [references](https://caniuse.com/#search=CSS%20Variables) from caniuse.com

Here is our FE's current codebase structure at QUOINE:

![QUOINE FE code structure screenshot](/img/quoine-fe-code-structure.png "QUOINE FE code structure")



First of all, I had to comment out these lines of code to prevent react-script from yelling at me when importing code outside of src folder

```
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
// and
new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
```

Secondly, I went for path.js file in react-script package located under CRA's project and modify it to match our current config. Due to forking version of CRA have to bootstrap several applications, I have to make it as generic as possible to avoid duplication in all over place. The .env file path need to point to the root project folder instead of current application folder. The appSrc path also need to be located right at the root level accordingly.

![CRA webpack dev config screenshot](/img/cra-webpack-dev-config.png "CRA webpack dev config")

Next, I looked up to css module configuration from CRA and found out that they added optional support for CSS module without reject by naming convention. Any files that are named as *.module.css will be treated as CSS module while other will be consider all at local scope.

```
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
```

At QUOINE, all css files are treated as CSS modules and whenever we need any global style we always stick to escape hatch from CSS module library by :global prefix. This was the reason why I remove optional CSS module and chose to follow the path that we did at QUOINE to prevent CSS breaking changes.

![Webpack css module configuration screenshot](/img/cra-css-module.png "Webpack css module configuration")

Last but never be the least, CRA only process files located under src with Babel's transpilation step. Respectively, I had to re-config babel-loader resolver to process all necessary files in the project except node_modules and bowers since they are libraries folder that do not need to be transpiled.

![Webpack dev config babel screenshot](/img/cra-webpack-dev-config-babel.png "Webpack dev config babel")

**Conclusion:**

Thanks to all those steps above, the development stage of front-end at QUOINE get back on track with the latest improvement from original CRA without any breaking changes. 🎉

- - -

The forking version of create-react-app is hosted at this [repo](https://github.com/willnguyen1312/cra-fork) before moving to under QUOINE's Github organization private repositories.
