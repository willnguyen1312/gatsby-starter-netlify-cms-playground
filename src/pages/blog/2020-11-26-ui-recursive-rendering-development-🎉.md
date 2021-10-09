---
templateKey: blog-post
title: "UI Recursive rendering development \U0001F389"
date: 2020-11-26T09:01:25.537Z
description: "In this post, I would like to revisit something that scared the hell out of me in the past \U0001F631 and share my journey on why I love it so much these day as it helps me to solve all the problems I faced at work and personal projects. Stay tuned and read on \U0001F917"
tags:
  - React
  - Recursive UI
  - Axon
---
[Accompany presentation](https://ui-recusive-rendering.netlify.app/)

The first time I have ever encountered recursion was as tiny as calculate the factorial of a non-negative integer.

![Recursive Factorial](/img/recursivefactorial.png "Recursive Factorial")

Back in the day, this was absolutely bending my mind. And I kept asking myself the question why someone would solve a problem like this instead of just simple for iteration loop 🤔. Later one, I got intrigued by Functional Programming paradigm and start discovering more about various techniques inside. I chose Haskell as it's named as the only pure functional language in Wikipedia. The language designer did not leave any room for imperative loop at all and everything is just pure. This was the first place where I learned a lot about recursion. I was still not convinced enough to see its usefulness. Later on, as I spent time on Data Structure and Algorithm, I saw its usage a lot in Tree, Trie, MergeShort, BinarySearch, etc. But this was mainly for coding interview. I had been kept in the dark for so long until I found the loveliness of recursive rendering technique in UI development. I called it UI recursive rendering 😄. And, in this post I will write in detail about the usefulness of recursive rendering by walk though the process of building a nested menu component in React 🤓

First, let's have a look at final result of what we are going to build - [playground](https://react-recursive-rendering.netlify.app/) 🚀

![Recursive Menu](/img/recursivemenu.gif "Recursive Menu")

As you can see, the menu will be on/off on button toggling. And as we hover on sub menu's label, the child will be rendered on demand. Let's jump into the implementation now. We are going to start off with the button and the Menu component as below

![Recursive Start](/img/recursivestart.png "Recursive Start")

\
As we might notice, we need to pass down the reference of button element to Menu component so that the Menu component later on can know where to render. We also need the definition of MenuDataType as below

![Recursive Data Type](/img/recursivedatatype.png "Recursive Data Type")

The data type is a bit funky since the children property reference its parent. We are going to see it's usage real soon 😆. Now, we are going to code up two components, specifically MenuWrapper and MenuItem which powers up the whole recursive UI above.

![Recursive Components](/img/recursivecomponents.png "Recursive Components")

This is where the fun begins, MenuWrapper component was the one got rendered initially by our App component. It then render all the data passed by mapping each item to MenuItem component. Inside MenuItem component, we rendered MenuWrapper component on label text hovered. This is called submenus. The key point is understand the code above is where it stops!. This reminds me back in my computer science class in our Canadian's student exchange program. The teacher asked the whole class this question "What is the most important thing of a program?". Nobody could give the correct answer and everybody got shocked when they received the answer including me 😌. **The program must stop!** This is absolute true when we are dealing with recursive rendering in UI development. Since our UI components calling each other. There are more and more instanced got created until it reaches the **base case**. In this case, the base case is when component received data without children or its hover state is false. 😊

This is our final result in the browser. It's simple yet fantastic, isn't it? 😎

![Recursive Dev Tool](/img/recursivedevtool.png "Recursive Dev Tool")

\
You could clone the repo and see inspect the code with pleasure [here](https://github.com/willnguyen1312/react-recursive-rendering) 👻\
\
I'm currently working on a custom bookmark manager browser extension which relies heavily on this technique. The problem we have had with default bookmark manager is that it could not help you search for the URL based on certain keyword included in the page's content. This is exactly what I'm going to do, we will have a beautiful and functional bookmark manager application that serves exactly what it should. The users will be able to retrieve the correct URL with couple of keystrokes to type their memorable keyword from their reading on the articles. Peace out and see you next time 🤠

❤️ ❤️ ❤️ Be well Be happy ❤️ ❤️ ❤️
