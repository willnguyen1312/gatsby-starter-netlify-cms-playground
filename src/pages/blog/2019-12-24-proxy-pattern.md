---
templateKey: blog-post
title: Proxy Pattern
date: 2019-12-24T07:40:14.107Z
description: Provide a surrogate or placeholder for another object to control access to it
tags:
  - Proxy Pattern
  - Golang
---
![Proxy Pattern Diagram](/img/proxypatterndiagram.png "Proxy Pattern Diagram")

### Applicability

* A remote proxy provides a local representative for an object in a different address space
* A virtual proxy creates expensive objects on demand. The ImageProxy de- scribed in the Motivation is an example of such a proxy
* A protection proxy controls access to the original object. Protection proxies are useful when objects should have different access rights
* A smart reference is a replacement for a bare pointer that performs additional actions when an object is accessed

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take a simplest example to demonstrate the usage of this pattern. We have a render method that the library implemented. We want to log out every time the render method gets called. We first of all want to define the Renderer interface for both library and proxy to follow like so

![Proxy Renderer Interface](/img/proxyrendererinterface.png "Proxy Renderer Interface")

Then we would want to implement the the library that follows this pattern like the attachment below

![Proxy Library](/img/proxylibrary.png "Proxy Library")

Finally we finish this by the proxy wrapper struct that does few things around actual call to wrapped library

![Proxy Wrapper](/img/proxywrapper.png "Proxy Wrapper")

And there we have it - the Proxy Pattern implemented in Go. With this pattern, we could have an extract layer cover the real subject. The real world example would be having user authenticated, log access, et cetera

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/12/files) 😊

Happy coding 😎
