---
templateKey: blog-post
title: "Introducing INAB app - aka I Need A Budget \U0001F4B8"
date: 2019-03-02T11:47:42.575Z
description: >-
  I have always been suck at budget management. I wanted one customized budget
  management application that would suit my need and don't have to play for it.
  Now it's the time for me to build one with latest topnotch stack of technology
  out there - React & GraphQL
tags:
  - applications
---
> Money can't buy happiness 💞

It's one of the most famous sayings of all times. I had believed this quote for such a very very long time. Until one day, I watched a TED Talks that totally blew my mind away. Seem like the sentence above is not absolutely correct. "Could money buy happiness" - my answer is **YES** and **NO**. And here is why:

* Without being able to fulfill our basic need according to [Maslow](https://www.simplypsychology.org/maslow.html) model, we would never be happy. Hence, we definitely need money
* Money itself can't buy you happiness. The **WAY** you use it **DOES**
* Happiness comes from every little things that most of us have forget since we become adult. Things like have a small talk to stranger, go to the beach, playing games, go for a walk with your dog, etc 

<br />

<br />

<iframe width="100%" height="600" src="https://www.youtube.com/embed/ZwGEQcFo9RE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

<br />

<br />

Just a brief explanation of why we all need money and definitely a money management system. I strongly believed there should never be a solution so-called "one size fit all". So, I took my initiative from one of the most famous budget management system out there - [YNAB ](https://www.youneedabudget.com/). Instead of calling it YNAB, I call it INAB to solve my own problems and use this chance to build something that could serve someone else as a foundation in their upcoming projects

Regarding to my project, I decided to take the mono repo approach in order to leverage the ecosystem around [Apollographql](https://www.apollographql.com/). The codebase consists of three packages thanks to awesome tool so-called [Lerna](https://lernajs.io/):

* Common - code share between server and client
* Web - front-end React application
* Server - apollo server application

The url link - <https://github.com/willnguyen1312/inab_graphql>

Enjoy guys, please feel free to fork the repo. I'm open up to all ideas and suggestions. Peace out 😊
