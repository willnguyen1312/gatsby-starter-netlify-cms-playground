---
templateKey: blog-post
title: "SOLID in component architecture \U0001F389"
date: 2021-07-01T08:01:11.932Z
description: "In this post, I would like to share my lesson learnt over the past couple of years on how to apply SOLID principles in component architecture to avoid spaghetti code. Hopefully it will help others on clean architecture. Stay tuned and read on guys \U0001F60E"
tags:
  - React
  - Vue
  - Axon
  - Frontend
  - SOLID
---
> **SOLID** stands for five design principles intended to make software designs more understandable, flexible and maintainable

[Reference link](https://en.wikipedia.org/wiki/SOLID)

Let's go over one by one, shall we 😊

**Singular-responsibility principle**

There should never be more than one reason for a component to change, period. The main reason why we came up with component architecture in the first place is to leverage reusability, modularity and composition for maintainable application regardless of sizes. No one would want to maintain a one large Application component built with  thousand lines of code and  a ton of features baked in. We are losing reusability by doing this. What we want is to have the same look and feel of a component across platform like the Search component from Microsoft products (One Drive, Windows 10, Skype, Outlook, etc). We should always favor composition over inheritance... This might sound strange to some of us but previous versions of Vue and React allows developers to extends components however they like. I personally maintained couple ones like those at Axon and I hated them the most 🥶 .  The simplest example would be a [Button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) component. First and foremost, it must be a button which has all capabilities as the one from native web. And, this component should act like Button without anything extra. Someone might put thing like tooltip inside the component which will create one more reason for a button to change - what if we want to customize the position of the tooltip, should we go to button component, absolutely not! That should be the job of a Tooltip component to expose API for client code to customize UI on demand 😊

**Open-closed principle**

Component should open for extension, but closed for modification. A component with good design API should allow client code to provide customization on demand at ease. And there are variety of techniques to achieve this such as composition, render prop, HOC, slot in Vue, etc. The simplest example would be a button component to expose its API for client code to customize its icons or loading rendering mechanism via props. 

**Liskov substitution principle**

Client code that use components provided the same interface should be able to continue use it without knowing the internal implementation. Let's say we have a list of components that implement ImageProps interface. Internally, these components can use different kind of rendering mechanism such as SVG, canvas, image or picture. These components can replace each other without any breaking.

**Interface segregation principle**

Many client-specific interfaces are better than one general-purpose interface. Let's take Menu components for an example. We could have a one general purpose MenuProps interface and applied on all components or just one giant component. Instead we should break it down into many specific interfaces and implement them separately. A very good example of this is [Menu components from Chakra UI library](https://chakra-ui.com/docs/overlay/menu)

**Dependency inversion principle**

Component should depends on abstraction, not concretion. A typical example of this would be Pagination component. It should not know specifically which API to fetch data upon navigation but relies totally on dependency such as props or injected services. This makes component responsible for only its rendering UI capability which needs to be reused across applications without bothering on how to fetch data from specific endpoints.

I have seen many weird code in my life (both written by me and others). I have learnt them and try to not make the same mistakes all over again. Clearly, these principles always shine whenever I needed to make things clean. Thanks to Vue and React props and states data model. All of these principle can be implemented at ease along side with [atomic design](https://bradfrost.com/blog/post/atomic-web-design/). SOLID has been available for more than two decades and it's proven to be battle-tested and here to stay. Let's apply them to [make the world a better place through quality software](https://kentcdodds.com/). Together, we are creating the beautiful web for human to use and relax with amazing feeling 😇

❤️❤️❤️ Be well, Be happy ❤️❤️❤️
