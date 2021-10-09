---
templateKey: blog-post
title: Adapter Pattern
date: 2019-12-22T09:39:44.714Z
description: >-
  Convert the interface of a class into another interface clients expect.
  Adapter lets classes work together that couldn't otherwise because of
  incompatible interfaces
tags:
  - Adapter Pattern
  - Golang
---
![Adapter Pattern Diagram](/img/adapterdiagram.png "Adapter Pattern Diagram")

### Applicability

* You want to use an existing class, and its interface does not match the one you need
* You want to create a reusable class that cooperates with unrelated or unforeseen classes, that is, classes that don't necessarily have compatible interfaces
* You need to use several existing subclasses, but it's un- practical to adapt their interface by subclassing every one. An object adapter can adapt the interface of its parent class

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

The typical example for this pattern would be that we have different transcoder (React, Vue and Angular). This would take a template and transcode it back to the format that browser would understand (raw html). First we need to define a Transcoder interface like below

![Adapter Transcoder InterfaceI](/img/adaptertranscoderinterface.png "Adapter Transcoder InterfaceI")

This is a contract between consumer and provider code. Next up, we implement couple of incompatible libraries so that the adapter could apply

![Adapter Libs](/img/adapterlibs.png "Adapter Libs")

Next, we want to finish up by implement a TranscoderAdapter struct for client code to use

![Adapter Provider Code](/img/adapterprovidercode.png "Adapter Provider Code")

And there we have Adapter pattern implication in Go. With this pattern, we have a clear contract between client code and provider code that guarantee the extensibility of the code. We can add new library with appropriate functionalities meet requirements provided that the interfaces remain the same

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/6) 😊

Happy coding 😎
