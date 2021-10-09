---
templateKey: blog-post
title: Decorator Pattern
date: 2019-12-23T07:47:20.050Z
description: >-
  Attach additional responsibilities to an object dynamically. Decorators
  provide a flexible alternative to subclassing for extending the functionality
tags:
  - Decorator Pattern
  - Golang
---
![Decorator Pattern Diagram](/img/decoratorpatterndiagram.png "Decorator Pattern Diagram")

### Applicability

* To add responsibilities to individual objects dynamically and transparently, that is, without affecting other objects
* For responsibilities that can be withdrawn
* When extension by subclassing is impractical. Sometimes a large number of independent extensions are possible and would produce an explosion of subclasses to support every combination. Or a class definition maybe hidden or otherwise unavailable for subclassing

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's make up a simplistic example that couple of library would like to complement each other. We have three library so-called React, Vue and Angular. We want to combine functionalities of these library in whatever order as long as all library could do their own work on single call from client code. First of all, let's standardize a single interface for all libraries to implement upon

![Decorator Library Interface](/img/decoratorlibraryinterface.png "Decorator Library Interface")

Then following by concrete implementation of React, Vue and Angular struct that know how to work either alone or with another of the same kind

![Decorator Library Implementation](/img/decoratorlibraryimplementation.png "Decorator Library Implementation")

And there we have the Decorator Pattern implemented in Go. This pattern is one of my favorite patterns as it is so practice and I have seen many usage in software development. For example, the followings make use of the Decorator Pattern:

* Middleware Pattern in server side development
* With* Decorator in React library community
* Middleware Pattern in Redux library

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/9) 😊

Happy coding 😎
