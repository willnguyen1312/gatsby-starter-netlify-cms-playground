---
templateKey: blog-post
title: Chain Of Responsibility Pattern
date: 2019-12-24T08:40:48.417Z
description: >-
  Avoid coupling the sender of a request to its receiver by giving more than one
  object a chance to handle the request. Chain the receiving objects and pass
  the request along the chain until an object handles it.
tags:
  - Chain Of Responsibility Pattern
  - Golang
---
![Chain Of Responsibility Pattern Diagram](/img/chainofresponsibilitypatterndiagram.png "Chain Of Responsibility Pattern Diagram")

### Applicability

* More than one object may handle a request, and the handler isn't known a priori.The handler should be ascertained automatically.
* You want to issue a request to one of several objects without specifying the receiver explicitly
* The set of objects that can handle a request should be specified dynamically.

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's go for a quick example. We have an imaginary workflow as following. The UI get render in order React -> Vue -> Angular -> Done. Any step might be escaped and move on next only if the proper property set to be done. Simple enough, let's first define a standard interface for the chain's components to follow

![Chain Of Responsibility Library Interface](/img/chainlibaryinterface.png "Chain Of Responsibility Library Interface")

Next, we want to code up React, Vue and Angular libraries accordingly to the defined interface as below

![Chain Of Responsibility Library Implementation](/img/chainlibaryimplementation.png "Chain Of Responsibility Library Implementation")

And the final key to mark the end of the workflow

![Chain Of Responsibility Final Library](/img/chainlibraryfinal.png "Chain Of Responsibility Final Library")

And the UI struct to attach multiple steps indicate whether responsibility has been fulfilled

![Chain Of Responsibility Client Struct](/img/chainlibraryclientstruct.png "Chain Of Responsibility Client Struct")

There we go - the Chain Of Responsibility Pattern implemented in Go. This pattern provide strong single responsibility and open/closed principles. The only drawback is that multiple handlers might get unhandled which most of the time might not be an issues since its only job is to forward the request to the next handler in the chain.

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/13) 😊

Happy coding 😎
