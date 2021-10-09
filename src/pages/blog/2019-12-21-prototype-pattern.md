---
templateKey: blog-post
title: Prototype Pattern
date: 2019-12-21T03:13:14.314Z
description: >-
  Specify the kinds of objects to create using a prototypical instance, and
  create new objects by copying this prototype
tags:
  - Prototype
  - Golang
---
![Prototype Pattern Diagram](/img/prototypediagram.png "Prototype Pattern Diagram")

### Applicability

* The classes to instantiate are specified at run-time
* Avoid building a class hierarchy of factories that parallels the class hierarchy of products
* When instances of a class can have one of only a few different combinations of state. It may be more convenient to install a corresponding number of prototypes and clone them rather than instantiating the class manually, each time with the appropriate state

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

The typical example would be that we have done some file system creation, then committed to the system and now we to continue that work with some tweak such as change the file name without bothering to recreating it from scratch. This is where the prototype pattern comes into place. First we want to create an interface that must have a clone method in it like below

![Prototype Interface](/img/prototypeinterface.png "Prototype Interface")

Next we want to have a complete struct that implements this interface like so

![Prototype Implementation](/img/prototypeimplementation.png "Prototype Implementation")

Here is an example of how prototype pattern would be used in practice. The file after being created, then get cloned into new file. From this point, any modification made to the original file will not affect the cloned file at all thanks to the Prototype Pattern in use 😁

![Prototype Test](/img/prototypetest.png "Prototype Test")

And there we have it, the Prototype Pattern complete implementation in Go. With this pattern in place, the client code should not worry about how to copy the existing object into something new and start new process of work on it independently. Everything should be taken care of internally 😊

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/5/files) 😊

Happy coding 😎
