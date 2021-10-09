---
templateKey: blog-post
title: Mediator Pattern
date: 2019-12-25T07:10:58.792Z
description: >-
  Define an object that encapsulates how a set of objects interact. Mediator
  promotes loose coupling by keeping objects from referring to each other
  explicitly, and it lets you vary their interaction independently
tags:
  - Mediator Pattern
  - Golang
---
![Mediator Pattern Diagram](/img/mediatorpatterndiagram.png "Mediator Pattern Diagram")

### Applicability

* A set of objects communicate in well-defined but complex ways. The resulting interdependencies are unstructured and difficult to understand
* Reusing an object is difficult because it refers to and communicates with many other objects
* A behavior that's distributed between several classes should be customizable without a lot of subclassing

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's code up a sample application in which it has several renderers and a mediator controls the rendering processing as there is only one renderer allowed to work at a time. First of all, the interfaces for Renderer and Mediator

![Mediator Interfaces](/img/mediatorinterfaces.png "Mediator Interfaces")

Next, we would want to implement couple of renderers like below

![Mediator Renderer Implementation](/img/mediatorrendererimplementation.png "Mediator Renderer Implementation")

And finally the implementation of mediator that notify and control how these renderer works in harmony

![Mediator Implementation](/img/mediatormediatorimplementation.png "Mediator Implementation")

And voila, we have the implementation of Mediator Pattern in Go. This pattern helps to mitigate the couple of components when working together in a complex system. The prominent example would be forms, airport, harbor, et cetera

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/18) 😊

Happy coding 😎
