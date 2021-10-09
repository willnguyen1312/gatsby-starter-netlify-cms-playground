---
templateKey: blog-post
title: Builder Pattern
date: 2019-12-20T12:17:46.229Z
description: >-
  The intention of Builder Pattern is to separate the construction of a complex
  object from its representation so that the same construction process can
  create different representations
tags:
  - Builder
  - Golang
---
![Builder Pattern Diagram](/img/builderdiagram.png "Builder Pattern Diagram")

### Applicability

* The algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled
* The construction process must allow different representations for the object that's constructed

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take an example in building UI elements based on different libraries such as React, Vue and Angular. We need a thing so-called director to group the creation of UI element consistent across various area of our codebase. The Direction would take a builder as the only parameter to build a complete UI element later. The attachment below demonstrate just that:

![Builder Director](/img/builderdirector.png "Builder Director")

Next, we want to define an interface for our UI element which is the final result of different builders.

![Builder Product](/img/builderproduct.png "Builder Product")

And finally, we finish the implementation with a set of different builders for our UI elements which are React, Vue and Angular builders

![Builder Builders](/img/builderbuilders.png "Builder Builders")

And there we goes, we have a complete implementation of Builder Pattern in Go.

P/s: The accompany code is included in [](https://github.com/willnguyen1312/go-design-patterns/pull/2)[this PR](https://github.com/willnguyen1312/go-design-patterns/pull/2/files) 😊

Happy coding 😎
