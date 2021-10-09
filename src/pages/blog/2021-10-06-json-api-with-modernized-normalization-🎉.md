---
templateKey: blog-post
title: "JSON API with modernized normalization \U0001F389"
date: 2021-10-06T10:40:28.012Z
description: "In this post, I would like to share my story with you guys on the problem that I recently faced at Axon when dealing with JSON API style. Stay tuned and read on guys \U0001F60E"
tags:
  - React
  - JSON API
  - Axon
  - Editor
---
First of all, let's briefly talk about what [JSON API](https://jsonapi.org/) is, why it exists and [what kind of problems does it solve](https://nordicapis.com/the-benefits-of-using-json-api/) 😊

> A SPECIFICATION FOR BUILDING APIS IN JSON

The quote above is taken straight away from its official website. As part of API development, we often have to come up with some sort of API structure for your companies to make it consistent across all projects. The followings are often taken into account:

* Data structure
* Error style
* Meta data fields
* Resources links for further detail
* Objects relationship to avoid over-fetching and under-fetching. It's something [GraphQL](https://graphql.org/) excels at xD

JSON API was born to solve all of these headaches by defining [a very strict specification](https://jsonapi.org/format/) on how server and client should communicate over the network. As you browser the document sooner or later, you will notice certain fields are labeled with **MUST,** **OPTIONAl, RECOMMENDED, etc** are part of their [convention](https://jsonapi.org/format/#conventions) to follow. At Axon, we have leveraged this specification to certain extend. As of writing, I was working extensively on the Front-End side, and it's my very first time stumble upon this kind of API. Honestly, I really hate this API style at first since it promotes certain keywords that just couldn't ring my bell such as:

* type - resource type
* relationships - resources' reference to other kinds
* meta - metadata information about resource
* links - resources' links for further detail
* attributes - other attributes than id and type
* included - the array includes all referenced relationships data

Months later, I had to integrate with one implementation of this API in my team and it's such as pain 🥲. I had to write a super complicated conversion utility function in my career - its time complexity is cubic aka Big O(n^3). I surely found it terrible, then I spent an afternoon to re-read about JSON API specification and started liking it. Now, it becomes my second favorite API after GraphQL 🤩. Thanks to well-defined data structure format, FE and BE teams can collaborate effectively, it also eases caching, save roundtrips and normalization. FE applications could load several related resources by a single API call and BE teams can freely optimize however they wants it behind the scene. After gaining some confidence from learning about JSON API documentation, I decided to look back at our API to see why it's so complicated to consume such API at Axon. I eventually found the root cause... They have not done it correctly as per specification. After informing them about their mistakes, I decided to work on the morning something called [JSON API Normalization](https://json-api-normalization.surge.sh/). This app also acts as simple json api structure validation and normalizer for any spec-compliant json data

The below is a snapshot of it 😎

![JSON API Normalization](/img/json-api-normalization.png "JSON API Normalization")

By having a single source of truth specification, we are now capable of normalizing data structures on the FE sides for easy consumption (put them in local state, context, store, et cetera) with minimal amount of roundtrip for any screens while having BE teams optimized the interfaces underneath the hood  😁

There you have it guys, my story on **love and hate** with JSON API specification and how we went from messy complexity FE code into well-formed resources friendly for easy consumption at Axon. Hopefully, this is helpful and you guys could learn something from our mistakes. Peace out and until next time 🥳

❤️❤️❤️ Be well, Be happy ❤️❤️❤️
