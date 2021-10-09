---
templateKey: blog-post
title: Bridge Pattern
date: 2019-12-23T03:14:53.982Z
description: >-
  Decouple an abstraction from its implementation so that the two can vary
  independently
tags:
  - Bridge Pattern
  - Golang
---
![Bridge Pattern Diagram](/img/bridgepatterndiagram.png "Bridge Pattern Diagram")

### Applicability

* You want to avoid a permanent binding between an abstraction and its implementation. This might be the case, for example, when the implementation must be selected or switched at run-time
* Both the abstractions and their implementations should be extensible by subclassing. In this case, the Bridge pattern lets you combine the different abstractions and implementations and extend them independently
* Changes in the implementation of an abstraction should have no impact on clients; that is, their code should not have to be recompiled
* You have a proliferation of classes as shown earlier in the first Motivation diagram. Such a class hierarchy indicates the need for splitting an object into two parts.
* You want to share an implementation among multiple objects (perhaps using reference counting), and this fact should be hidden from the client

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take the definition above into practice by implementing a simple HTTP service abstraction with multiple implementations include React, Vue and Angular. First of all, we need to define an abstraction interface and the implementation of this interface like below

![Bridge Abstraction](/img/bridgeabstraction.png "Bridge Abstraction")

Next, we would like to have a interface definition for all implementations to match the bridge between abstraction and implementation as the pattern defines

![Bridge Implementation](/img/bridgeimplementation.png "Bridge Implementation")

And there we have it - the Bridge Pattern implemented in Go. With this pattern, the consumer code is totally unaware of the development of abstraction and implementation internally. We could have multiple abstractions and implementations as long as it matches the bride interface among the two. Moreover, they all can be developed independently without the hassle of any inheritance

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/7) 😊

Happy coding 😎
