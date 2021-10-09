---
templateKey: blog-post
title: Visitor Pattern
date: 2019-12-26T09:06:34.255Z
description: >-
  Represent an operation to be performed on the elements of an object structure.
  Visitor lets you define a new operation without changing the classes of the
  elements on which it operates
tags:
  - Visitor Pattern
  - Golang
---
![Visitor Pattern Diagram](/img/visitorpatterndiagram.png "Visitor Pattern Diagram")

### Applicability

* An object structure contains many classes of objects with differing interfaces, and you want to perform operations on these objects that depend on their concrete classes
* Many distinct and unrelated operations need to be performed on objects in an object structure, and you want to avoid "polluting" their classes with these operations. Visitor lets you keep related operations together by defining them in one class. When the object structure is shared by many applications, use Visitor to put operations in just those applications that need them.
* The classes defining the object structure rarely change, but you often want to define new operations over the structure. Changing the object structure classes requires redefining the interface to all visitors, which is potentially costly. If the object structure classes change often, then it's probably better to define the operations in those classes

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

 Let's put this pattern into practice. Imagine we have couple of platform so-called web and mobile. We would like to have a visitor to operate on these existing platform without couple anything. First, let's have a platform interface

![Visitor Platform Interface](/img/visitorplatforminterface.png "Visitor Platform Interface")

Next, we would want to implement couple of concrete struct on this interface

![Visitor Platform Implementation](/img/visitorplatformimplementation.png "Visitor Platform Implementation")

Then, we need a Visitor Interface

![Visitor Interface](/img/visitorinterface.png "Visitor Interface")

And finally we would need a concrete implementation of this interface as below

![Visitor Implementation](/img/visitorimplementation.png "Visitor Implementation")

There we have it - the complete implementation of Visitor Pattern in Go. Typical example of this in real life would be how a insurance staff sell their product to different kind of people with various income 😜

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17)[](https://github.com/willnguyen1312/go-design-patterns/pull/18)[](https://github.com/willnguyen1312/go-design-patterns/pull/19)[](https://github.com/willnguyen1312/go-design-patterns/pull/20)[](https://github.com/willnguyen1312/go-design-patterns/pull/21) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/22) 😊

Happy coding 😎
