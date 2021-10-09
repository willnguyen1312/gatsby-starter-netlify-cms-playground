---
templateKey: blog-post
title: Memento Pattern
date: 2019-12-25T09:07:35.256Z
description: >-
  Without violating encapsulation, capture and externalize an object's internal
  state so that the object can be restored to this state later
tags:
  - Memento Pattern
  - Golang
---
![Memento Pattern Diagram](/img/mementodiagrampattern.png "Memento Pattern Diagram")

### Applicability

* A snapshot of an object's state must be saved so that it can be restored to that state later
* A direct interface to obtaining the state would expose implementation details and break the object's encapsulation

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take a simple example of text area where content is modified overtime. We would like to store the change and restore its state back at any point in time. First of all, let's define a originator in the diagram as below

![Memento Originator](/img/mementooriginator.png "Memento Originator")

Next, we want to implement the Memento struct

![Memento Struct](/img/mementostruct.png "Memento Struct")

And finally the implementation of caretaker that get/set memento to its internal storage

![Memento Caretaker](/img/mementocaretaker.png "Memento Caretaker")

And there we have it the Memento Implementation in Golang. This pattern is mostly useful for the application that require the traverse between different modified state such as text editor, user actions, et cetera

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17)[](https://github.com/willnguyen1312/go-design-patterns/pull/18) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/19) 😊

Happy coding 😎
