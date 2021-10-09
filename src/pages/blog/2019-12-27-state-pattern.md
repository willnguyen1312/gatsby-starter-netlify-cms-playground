---
templateKey: blog-post
title: State Pattern
date: 2019-12-27T01:30:12.844Z
description: >-
  Allow an object to alter its behavior when its internal state changes. The
  object will appear to change its class
tags:
  - State Pattern
  - Golang
---
![State Pattern Diagram](/img/statepatterndiagram.png "State Pattern Diagram")

### Applicability

* An object's behavior depends on its state, and it must change its behavior at run-time depending on that state
* Operations have large, multipart conditional statements that depend on the object's state. This state is usually represented by one or more enumerated constants. Often, several operations will contain this same conditional structure. The State pattern puts each branch of the conditional in a separate class. This lets you treat the object's state as an object in its own right that can vary independently from other objects

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

 Let's put this into practice by coding up a simple application that simulates light ball behavior. We have a light ball with battery and two on and off buttons that change the state and reduce battery conditionally. If the battery reach zero, there won't be any actions happen. First, let's define a state interface as below

![State Interface](/img/stateinterface.png "State Interface")

And we need a light ball implementation that leverage the state

![State Light Ball Struct](/img/statelightballstruct.png "State Light Ball Struct")

And finally we would need OnState and OffState implementation like so

![State Implementation](/img/stateimplementation.png "State Implementation")

There we have it - the State Implementation in Go. We probably interact with system uses this pattern in real life such as vending machine, volume up button on the phones, et cetera 😛

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17)[](https://github.com/willnguyen1312/go-design-patterns/pull/18)[](https://github.com/willnguyen1312/go-design-patterns/pull/19)[](https://github.com/willnguyen1312/go-design-patterns/pull/20)[](https://github.com/willnguyen1312/go-design-patterns/pull/21)[](https://github.com/willnguyen1312/go-design-patterns/pull/22) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/23) 😊

Happy coding 😎
