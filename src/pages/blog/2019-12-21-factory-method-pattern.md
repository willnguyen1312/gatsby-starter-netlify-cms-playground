---
templateKey: blog-post
title: Factory Method Pattern
date: 2019-12-21T02:43:07.251Z
description: >-
  Define an interface for creating an object, but let subclasses decide which
  class to instantiate. Factory Method lets a class defer instantiation to
  subclasses
tags:
  - Factory Method
  - Golang
---
![Factory Method Diagram](/img/factorymethoddiagram.png "Factory Method Diagram")

### Applicability

* A class can't anticipate the class of objects it must create
* A class wants its sub classes to specify the objects it creates
* Classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take a practical example that illustrates the usage of this method. We have various UI elements can make a request that are React, Vue and Angular. We want to make the code extensible in that sense that the client code should not be changed in case of switching from one library to another.

First of all, we need to define an interface of concrete product so that the client code can use as below:

![Factory Method Product Interface](/img/factorymethodproductinterface.png "Factory Method Product Interface")

The client code should only know that any library could make the request call no matter what. Then we need to define a function to create a UI element like so

![Factory Method Creator](/img/factorymethodcreator.png "Factory Method Creator")

And finally, we need to implement couple of struct that satisfy the Request interface so that the client code can call upon

![Factory Method Concrete Product](/img/factorymethodconcreteproduct.png "Factory Method Concrete Product")

And voila 🎉, we have a complete implementation of Factory Method pattern in go. With this pattern in practice, the code is very extensible in the sense that the client code is loosely coupled to the library call. Hence, the potential change in the future due to requirement is totally at ease 😊

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files) [](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[this PR](https://github.com/willnguyen1312/go-design-patterns/pull/4/files) 😊

Happy coding 😎
