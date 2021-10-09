---
templateKey: blog-post
title: Abstract Factory Pattern
date: 2019-12-19T11:12:26.400Z
description: >-
  The intention of the Abstract Factory Pattern is for creating families of the
  related objects without specifying their concrete classes. The obvious example
  would be the console application print different output on various platforms
  such as Window, OSX, and Linux
tags:
  - Abstract Factory
  - Golang
---
![Abstract Factory Diagram](/img/abstractfactorydiagram.png "Abstract Factory Diagram")

**Applicability:**

* A system should be independent of how its products are created, composed and represented
* A system should be configured with one of multiple families of products
* A family of related product objects is designed to be used together, and you need to enforce this constraint
* You want to provide a class library of products, and you want to reveal just their interfaces, not their implementation

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's put the definition above into practical example. We have an abstract factory to create a factory  that create different buttons (React, Vue and Angular styles) based on the client code's configuration with very little knowledge about how the internal work inside to create a button. We first need to define two interfaces as below:

![Abstract factory interfaces](/img/abstractfactoryinterfaces.png "Abstract factory interfaces")

The Button interface is defined as a contract between client code and factories so that the consumer code can just call any methods defined by the Button interface. The GUI interface is defined so that the abstract factory concrete implementation knows how to create and return a factory which will be used to create a set of related objects.

Next, we implement various factories based on GUIFactory interface as below:

![Factories implementation](/img/factories.png "Factories implementation")

And last piece of work is to define different concrete implementation of Button UI Elements according to factories creation like so:

![Button Elements](/img/buttonelements.png "Button Elements")

And here is how we are going to use it:

![Abstract Factory Consumer Code](/img/abstractfactoryconsumer.png "Abstract Factory Consumer Code")

And voila 🎉 We have a complete implementation of the Abstract Factory Pattern in Go. The code is absolutely extensible thanks to complexity is hidden via the interface. As the new group of related objects requirement comes in, all we need to do is implementing a new factory and according UI elements to guarantee the contract defined in the interfaces - Svelte, Preact, Inferno, etc you name it 😜 

P/s: The accompany code is included in [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/1/files) 😊

Happy coding 😎
