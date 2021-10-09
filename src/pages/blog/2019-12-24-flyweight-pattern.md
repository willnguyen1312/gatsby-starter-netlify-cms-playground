---
templateKey: blog-post
title: Flyweight Pattern
date: 2019-12-24T05:29:10.383Z
description: Use sharing to support large numbers of fine-grained objects efficiently
tags:
  - Flyweight Pattern
  - Golang
---
![Flyweight Pattern Diagram](/img/flyweightpatterndiagram.png "Flyweight Pattern Diagram")

### Applicability

* An application uses a large number of objects
* Storage costs are high because of the sheer quantity of objects
* Most object state can be made extrinsic
* Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed.
* The application doesn't depend on object identity. Since flyweight objects may be shared, identity tests will return true for conceptually distinct objects.

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's put the definition above into practice. We have a list of three library that will be used differently at run time, the libraries' state can be made extrinsically  such as name and ID. There is no need to re-create these fields all over again to save memory footprint. We would need a factory and cache pool to alleviate that. First up, we want to have a library structure as below

![Flyweight Library Struct](/img/flyweightlibrarystruct.png "Flyweight Library Struct")

Then, we want to define a function that create different initial library state like below

![Flyweight Library Creator](/img/flyweightlibrarycreator.png "Flyweight Library Creator")

Last but not least, we need to implement a Library factory that contain the cache that store already created library and couple of utility methods to verify the success of application.

![Library Factory Implementation](/img/flyweightfactoryimplementation.png "Library Factory Implementation")

And there we have a complete implementation of Flyweight Pattern in Go. With this library, memory can be saved a ton at scale in tradeoff a more complexity added to the codebase. Hence, this pattern should be used with caution

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/11) 😊

Happy coding 😎
