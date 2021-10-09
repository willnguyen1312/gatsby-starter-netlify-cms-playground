---
templateKey: blog-post
title: "Problems with not using routing system properly -> UX === \U0001F633"
date: 2019-03-07T08:36:47.672Z
description: "I would like to blog about the problems with modern routing mechanism in a web application. Why does it matter and how to fix that upon my knowledge and experience \U0001F60A"
tags:
  - Web
---
First and foremost, I want to list out the common problems with improper implementation of routing systems. After that, I am going to write about how to tackle them one by one. Ready? Here we go:

1. Forget to check for user's permission on each screen
2. Forget to redirect user's back to where they wanted to view in the first place after authentication
3. Render something on screen and redirect user after checking condition (This mostly happened mostly to client-side rendering application)

**"Forget to check for user's permission on each screen"** - The first problem is a very common one I have seen in early development of any application. We follow the specification written by Product Owner. After user provide correct id and password, just forward them to the home screen. The missing key point worth highlighting here is that "Always bear in mind URL is part of the UI". As you might type http://hostdomain/sign-in and ... oh ow they feel like they are in but not quite. The reason is because we forgot to prevent sign-in route from being accessed after log-in. Someone might think this is silly but not, user is who we server - better do a great job. otherwise your competitor will.

**"Forget to redirect user's back to where they wanted to view in the first place after authentication"** - The second one is redirecting user to where they wanted to go after successful authentication. This require the value of first authenticated route. The flow is as below:

1. First redirect user back to login page with redirect url query param either set in memory or part of the URL.
2. After user complete the log in, they will be redirected to where they wanted to go in the first place. This requires Login component hold a value pass from previous one

**"Render something on screen and redirect user after checking condition"** - The last but never be the least. The application should conduct any condition check prior to render anything to the screen (Flash of content). Things like update new term of service, update-password policy, et cetera. The check should be done as quickly as possible before rendering anything accordingly

<br />

**Conclusions:**

Routing can be daunting at first but it doesn't have to be. With proper planning and careful inspection, the right abstraction can be drawn out to give your application the feeling of working silky smooth while remain the quality of content at 5 start ⭐️⭐️⭐️⭐️⭐️



References: <https://gist.github.com/ryanflorence/eba97731b5579a1c01702c9d394b3feb>
