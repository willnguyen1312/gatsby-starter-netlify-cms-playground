---
templateKey: blog-post
title: Composite Pattern
date: 2019-12-23T04:25:53.080Z
description: >-
  Compose objects into tree structures to represent part-whole hierarchies.
  Composite lets clients treat individual objects and compositions of objects
  uniformly
tags:
  - Composite Pattern
  - Golang
---
![Composite Pattern Diagram](/img/compositepatterndiagram.png "Composite Pattern Diagram")

### Applicability

* You want to represent part-whole hierarchies of objects
* You want clients to be able to ignore the difference between compositions of objects and individual objects. Clients will treat all objects in the composite structure uniformly

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's put this into practice by implementing a simple box finder structure. The Box can have both file and another box inside which can contains similar objects. The client code should not care much about the internal structure of these box and file subjects but treat them uniformly when calling method on them. First, we need to define a unified interface for "leaf" and "container" object to implement

![Composite Finder Interface](/img/compositefinderinterface.png "Composite Finder Interface")

Next we are going to implement a leaf object which is File struct

![Composite File Struct](/img/compositefilestruct.png "Composite File Struct")

And finally is the container object which is Box struct which can contain another Fox and File

![Composite Box Struct](/img/compositeboxstruct.png "Composite Box Struct")

Eventually, we have the Composite Pattern implemented in Go. This pattern is most suitable for tree-like data structure like the example above. The misuse of this pattern could lead to immense complexity in codebase and hard to maintain. Thus, right tool for the job all the things ⚙️

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/8) 😊

Happy coding 😎
