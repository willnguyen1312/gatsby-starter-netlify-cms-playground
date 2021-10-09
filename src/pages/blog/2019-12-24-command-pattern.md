---
templateKey: blog-post
title: Command Pattern
date: 2019-12-24T10:07:16.184Z
description: >-
  Encapsulate a request as an object, thereby letting you parameterize clients
  with different requests, queue or log requests, and support undoable
  operations
tags:
  - Command Pattern
  - Golang
---
### Applicability

* Commands are an object-oriented replacement for callbacks
* Specify, queue, and execute requests at different times. A Command object can have a lifetime independent of the original request. If the receiver of a request can be represented in an address space-independent way, then you can transfer a command object for the request to a different process and fulfill the request there
* Support undo. The Command's Execute operation can store state for reversing its effects in the command itself. The Command interface must have an added un-execute operation that reverses the effects of a previous call to execute. Executed commands are stored in a history list. Unlimited-level undo and redo is achieved by traversing this list backwards and forwards calling un-execute and Execute, respectively
* Support logging changes so that they can be reapplied in case of a system crash. By augmenting the Command interface with load and store operations, you can keep a persistent log of changes. Recovering from a crash involves reloading logged commands from disk and re executing them with the Execute operation
* Structure a system around high-level operations built on primitives operations. Such a structure is common in information systems that support transactions.A transaction encapsulates a set of changes to data. The Command pattern offers a way to model transactions. Commands have a common interface, letting you invoke all transactions the same way. The pattern also makes it easy to extend the system with new transactions

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's make up one example to illustrate the pattern above, we have a UI button that we want to customize the rendering behavior of the browser dynamically. We can do that by specify different commands attach to buttons at run time. We first want to specify the interface that has an method to be call like below

![Command Renderer Interface](/img/commandrendererinterface.png "Command Renderer Interface")

Next, we want to implement two commands Enable and Disable respectively

![Command Enable Disable Struct](/img/commandenabledisablestruct.png "Command Enable Disable Struct")

Then, the actual receiver knows how to perform action upon carrying request

![Command Receiver](/img/commandreceiver.png "Command Receiver")

And finally, the invoker that tell the command to carry out the request object to according receiver

![Command Invoker](/img/commandinvoker.png "Command Invoker")

And there we have the Command Pattern implemented in Go. This pattern makes the code very singular and extensible by allow client code to customize its need on demand. The typical example would be how a flag can be attached different actions at run time dynamically

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/14) 😊

Happy coding 😎
