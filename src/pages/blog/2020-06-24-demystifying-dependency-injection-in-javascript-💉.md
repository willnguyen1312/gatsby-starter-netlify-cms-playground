---
templateKey: blog-post
title: "Demystifying dependency injection in JavaScript \U0001F489"
date: 2020-06-24T07:03:30.962Z
description: "In this post, I am going to code up a simplistic example of dependency injection pattern to show how other frameworks out there provide their magic out of this stunning feature of the language. Let's go \U0001F60E"
tags:
  - JS
---
For folks who are curious bout what decorator in JavaScript is all about, please visit this [series of awesome article](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript). You will learn a lot by reading through the code, feature available, the why and how of different types of decorator available in JavaScript. Finally, the reflect metadata plays a vital part in the whole architectures of many frameworks out there such as [Angular](https://angular.io/), [Nest](https://nestjs.com/) and [Vue's decorator style](https://github.com/vuejs/vue-class-component) xD



Alright, let's see the final code first before going to how we can achieve this style of coding

![DI Final](/img/di-final.png "DI Final")

This should look very familiar to folks in Angular world where they have to use `@Inject` a lot. The service instance doesn't need to instantiate all dependencies and everything just works at runtime. This is actually very simple to achieve as we could know exactly parameter types of service instance at runtime, create them, cache for singleton) and return its according instance. Let's see how Container class and custom service decorator look like xD



Firstly, container class

![DI Contianer](/img/di-container.png "DI Contianer")



And custom service decorator

![DI Service](/img/di-service.png "DI Service")

As we can see, the custom service decorator does nothing more than adding the service to the list of services in container service registry. Then, whenever we need to get an instance of any service, we retrieve a list of parameter types from constructor and start instantiating them before retuning its back to the original constructor. In order to keep all services single, we need to cache them in a map data structure and create / retrieve them on demand to keep memory footprint clean.



Final thought: Dependency injection is no more than services and container service registry (we don't have injector in this implementation but it should be easy to add). Meta programming is fun but it comes a the cost of complexity. Hopefully, decorator will find its way to be part of the standard JavaScript instead of being in stage 2 of the time of this writing 😬\
\
🎉🎉🎉 Be well, Be happy 🎉🎉🎉
