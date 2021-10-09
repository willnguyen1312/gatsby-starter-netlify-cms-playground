---
templateKey: blog-post
title: Strategy Pattern
date: 2019-12-25T02:55:58.745Z
description: >-
  Define a family of algorithms, encapsulate each one, and make them
  interchangeable. Strategy lets the algorithm vary independently from clients
  that use it
tags:
  - Strategy Pattern
  - Golang
---
![Strategy Pattern Diagram](/img/strategypatterndiagram.png "Strategy Pattern Diagram")

### Applicability

* Many related classes differ only in their behavior. Strategies provide a way to configure a class with one of many behaviors
* You need different variants of an algorithm. For example, you might define algorithms reflecting different space/time trade-offs. Strategies can be used when these variants are implemented as a class hierarchy of algorithms
* An algorithm uses data that clients shouldn't know about. Use the Strategy pattern to avoid exposing complex, algorithm-specific data structures.
* A class defines many behaviors, and these appear as multiple conditional statements in its operations. Instead of many conditionals, move related conditional branches into their own Strategy class.

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's implement an example to demonstrate the usefulness of this pattern. We have mobile platform that wants to use different rendering strategy offers by various library like React, Vue and Angular. First we want to define a strategy interface as below

![Strategy Interface](/img/strategyinterface.png "Strategy Interface")

Next we want to implement this interface by coding up several libraries mentioned above

![Strategy Implementation](/img/strategyimplementation.png "Strategy Implementation")

And now the context that contains a strategy

![Strategy Context](/img/strategycontext.png "Strategy Context")

Finally, we have the Strategy Pattern implemented in Go. With this pattern in place, we not only provide a strong loosely coupled code but also flexibility of the application. Take for instance a OAuth strategy, we can have various strategies developed independently and use it at run time such as Google, Facebook, Github, et cetera

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/15) 😊

Happy coding 😎
