---
templateKey: blog-post
title: Template Method Pattern
date: 2019-12-26T08:18:25.181Z
description: >-
  Define the skeleton of an algorithm in an operation, deferring some steps to
  subclasses. Template Method lets subclasses redefine certain steps of an
  algorithm without changing the algorithm's structure
tags:
  - Template Method Pattern
  - Golang
---
![Template Method Pattern Diagram](/img/templatemethodpatterndiagram.png "Template Method Pattern Diagram")

### Applicability

* To implement the invariant parts of an algorithm once and leave it up to subclasses to implement the behavior that can vary
* When common behavior among subclasses should be factored and localized in a common class to avoid code duplication

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's put this pattern into practice. We are going to implement a simple pizza maker application. We have a template that define a separate steps to perform action from the beginning to an end. Any cooker should implement that to be usable code. First, we need a template interface like so

![Template Method Interface](/img/templatemethodinterface.png "Template Method Interface")

Next we would need to make couple of implementation of the interface above

![Template Method Implementation](/img/templatemethodimplementation.png "Template Method Implementation")

And final is the consumer code that make use of this template method

![Tempalte Method Consumer](/img/templatemethodconsumer.png "Tempalte Method Consumer")

And there we have it - the complete implementation of Template Method Pattern in Go. The real world analogy would be two factors authentication either by sms or email. Both need to generate a unique code, just differ in sender method

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16)[](https://github.com/willnguyen1312/go-design-patterns/pull/17)[](https://github.com/willnguyen1312/go-design-patterns/pull/18)[](https://github.com/willnguyen1312/go-design-patterns/pull/19)[](https://github.com/willnguyen1312/go-design-patterns/pull/20) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/21) 😊

Happy coding 😎
