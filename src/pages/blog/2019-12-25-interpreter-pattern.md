---
templateKey: blog-post
title: Interpreter Pattern
date: 2019-12-25T04:23:25.734Z
description: >-
  Given a language, define a representation for its grammar along with an
  interpreter that uses the representation to interpret sentences in the
  language
tags:
  - Interpreter Pattern
  - Golang
---
![Interpreter Pattern Diagram](/img/interpreterpatterndiagram.png "Interpreter Pattern Diagram")

### Applicability

* The grammar is simple. For complex grammars, the class hierarchy for the grammar becomes large and unmanageable. Tools such as parser generators are a better alternative in such cases. They can interpret expressions without building abstract syntax trees, which can save space and possibly time
* Efficiency is not a critical concern. The most efficient interpreters are usually not implemented by interpreting parse trees directly but by first translating them into another form. For example, regular expressions are often transformed into state machines. But even then, the translator can be implemented by the Interpreter pattern, so the pattern is still applicable

[\#DesignPatterns](https://en.wikipedia.org/wiki/Design_Patterns)

Let's code up a really simple application to demonstrate the usage of this pattern. We want to define some rules upfront to assure what kind of sentence valid. Firstly, let's define an interface Interpreter

![Interpreter Interface](/img/interpreterinterface.png "Interpreter Interface")

Next up, we want to implement a Match Interpreter struct that check whether the string is match the name defined at run time

![Interpreter Match Struct](/img/interpretermatchstruct.png "Interpreter Match Struct")

Finally, we implement a checkName function that create a match interpreter as below

![Interpreter Creator](/img/interpretercreator.png "Interpreter Creator")

And there we have it - the Interpreter Pattern implemented in Go. This pattern is the least widely used by most of software engineer as it is dealing with the language gramma and syntax, this is not most of the application in the world are (typical example would be SQL)

P/s: The accompany code is included in[](https://github.com/willnguyen1312/go-design-patterns/pull/1/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/3/files)[](https://github.com/willnguyen1312/go-design-patterns/pull/6)[](https://github.com/willnguyen1312/go-design-patterns/pull/7)[](https://github.com/willnguyen1312/go-design-patterns/pull/8)[](https://github.com/willnguyen1312/go-design-patterns/pull/9)[](https://github.com/willnguyen1312/go-design-patterns/pull/11)[](https://github.com/willnguyen1312/go-design-patterns/pull/13)[](https://github.com/willnguyen1312/go-design-patterns/pull/14)[](https://github.com/willnguyen1312/go-design-patterns/pull/15) [this PR](https://github.com/willnguyen1312/go-design-patterns/pull/16) 😊

Happy coding 😎
