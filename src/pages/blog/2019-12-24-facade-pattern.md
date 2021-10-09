---
templateKey: blog-post
title: Facade Pattern
date: 2019-12-24T04:49:01.517Z
description: >-
  Provide a unified interface to a set of interfaces in a subsystem. Facade
  defines a higher-level interface that makes the subsystem easier to use
tags:
  - Facade Pattern
  - Golang
---
![](/img/facadepatterndiagram.png)

### Applicability

* You want to provide a simple interface to a complex subsystem.Subsystems often get more complex as they evolve. Most patterns, when applied, result in more and smaller classes. This makes the subsystem more reusable and easier to customize, but it also becomes harder to use for clients that don't need to customize it. A facade can provide a simple default view of the subsystem that is good enough for most clients. Only clients needing more customizability will need to look beyond the facade.
* There are many dependencies between clients and the implementation classes of an abstraction. Introduce a facade to decouple the subsystem from clients and other subsystems, thereby promoting subsystem independence and portability
* You want to layer your subsystems. Use a facade to define an entry point to each subsystem level. If subsystems are dependent, then you can simplify the dependencies between them by making them communicate with each other solely through their facades

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's code up a real simple application that provide a simple facade interface to talk to different subsystems underneath. First of, we would like to define three simple structs namely React, Vue and Angular like so

![Facade Subsystems](/img/facadasubsystems.png "Facade Subsystems")

And next we would finish up by provide a simple interface for client code talk to different subsystems

![Facade Interface](/img/facadainterface.png "Facade Interface")

There we have it, the Facade Pattern implemented in Go. With this pattern, the client code is absolutely unaware of the complexity goes behind the scene by large amount of subsystems - similar to how any hospital hotline work. We call in receptionist and she will redirect us to the right department - just that simple

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/10) 😊

Happy coding 😎
