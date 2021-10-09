---
templateKey: blog-post
title: Singleton Pattern
date: 2019-12-21T03:30:28.211Z
description: >-
  Ensure a class only has one instance, and provide a global point of access to
  it
tags:
  - Singleton
  - Golang
---
![Singleton Diagram](/img/singletondiagram.png "Singleton Diagram")

### Applicability

* There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point
* when the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

The typical example would be HTTP service that response for a whole application to make request to the server in web application. We mostly don't need to instance new service for each request. Instead, we would like to save the memory footprint by leveraging only one global http request service and reuse it all the time. The  struct for HTTPRequest would look like below:

![Singleton Struct](/img/singletonstruct.png "Singleton Struct")

Next, we want to create a singleton getter that is responsible for creation and retrieve singleton for the client code like below:

![Singleton Getter](/img/singletongetter.png "Singleton Getter")

And finally, we would want to define couple of utility methods that helps to demonstrate that the application work

![Singleton Usage](/img/singletonusage.png "Singleton Usage")

And there we have Singleton Pattern in Go. This pattern is very common in Angular world as every service is a singleton that is used across application. This helps to avoid unnecessary work for Garbage Collector and keep track of how different services being used at runtime 🎉

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/3/files) 😊

Happy coding 😎
