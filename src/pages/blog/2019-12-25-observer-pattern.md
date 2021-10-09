---
templateKey: blog-post
title: Observer Pattern
date: 2019-12-25T09:53:06.733Z
description: >-
  Define a one-to-many dependency between objects so that when one object
  changes state, all its dependents are notified and updated automatically
tags:
  - Observer Pattern
  - Golang
---
![Observer Pattern Diagram](/img/observerpatterndiagram.png "Observer Pattern Diagram")

### Applicability

* When an abstraction has two aspects, one dependent on the other. Encapsulating these aspects in separate objects lets you vary and reuse them independently
* When a change to one object requires changing others, and you don't know how many objects need to be changed
* When an object should be able to notify other objects without making assumptions about who these objects are. In other words, you don't want these objects tightly coupled

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's code up a simplistic example about an online store that has custom register to it. Once the item available in stock, we will email every single customer in the system about the change. Firstly, we would need a subject interface

![Observer Subject Interface](/img/observersubject.png "Observer Subject Interface")

Next up, the concrete implementation of the subject so-called Product

![Observer Product](/img/observerproduct.png "Observer Product")

Last but no least is the subscriber interface and its implementation

![Observer Subscriber Implementation](/img/observersubscriber.png "Observer Subscriber Implementation")

There we have it - the implementation of Observer Pattern in Go. This pattern is most useful when we are dealing with any sort of notification system such as e-commerce, stock exchange, bidding, et cetera

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17)[](https://github.com/willnguyen1312/go-design-patterns/pull/18)[](https://github.com/willnguyen1312/go-design-patterns/pull/19) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/20) 😊

Happy coding 😎
