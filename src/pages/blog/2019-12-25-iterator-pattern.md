---
templateKey: blog-post
title: Iterator Pattern
date: 2019-12-25T06:25:27.195Z
description: >-
  Provide a way to access the elements of an aggregate object sequentially
  without exposing its underlying representation
tags:
  - Iterator Pattern
  - Golang
---
![Iterator Pattern Diagram](/img/iteratorpatterndiagram.png "Iterator Pattern Diagram")

### Applicability

* To access an aggregate object's contents without exposing its internal representation
* To support multiple traversals of aggregate objects.
* To provide a uniform interface for traversing different aggregate structures

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's take a pretty simple example application in which we have a collection of libraries. We need to provide a way for this collection to create a iterator on demand. Hence, client code can just rely on simple interface defined by iterator to take iterate through the collection and take further action if needed. First, Let's define an Iterator interface

![Iterator Interface](/img/iteratorinterface.png "Iterator Interface")

Next, we would need to define a collection interface and implement a concrete collection on which we create a iterator on demand

![Iterator Collection](/img/iteratorcollection.png "Iterator Collection")

And finally, we would glue iterator and collection together by implement a sample library iterator as below

![Iterator Implementation](/img/iteratorimplementation.png "Iterator Implementation")

Eventually, we have it - the Iterator Pattern implemented in Go. This pattern provides an flexibility on independent development of client code, collection and iterator. Real life example would be how different recommendation tour guides to help you visit all attractive destinations in the city

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15)[](https://github.com/willnguyen1312/go-design-patterns/pull/16) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/17) 😊

Happy coding 😎
