---
title:  "Merged endpoint API's in depth"
categories: development API
image: apis2.jpg
color: d02708
published: true
---

In my [previous blog](/merged-endpoint-apis/) I wrote about merged endpoint API's. In this blog I will write about the idea behind the prototype my colleagues and I have created for a travel blog.

### The traditional REST API model

Let's start with a traditional REST API model. Every object type has it's own endpoint. Check [jsonapi.org](http://jsonapi.org/) for a general specification/format for REST API's. It's one of the many formats that get's implemented. Every object type get's requested seperatedly.

In the illustration below you can see how it would go if this was implemented in a SAAS travel blog. The client opens the url /journey/john-doe-in-china en the client starts to request 'api/journey/john-doe-in-china' than it knows the location ID's, the image ID's and the comment ID's and requests those three simultaniously, when recieving the comments, it also recieves the commenter ID's and starts to request those. The client application is piecing together all the information in a couple of requests.

![Traditional REST API implementation](/img/api1.svg)

Typical responses:

_/api/journey/17_
<pre><code>{
  "journey': [
    {
      "name": "in China",
      "id": 17,
      "introduction": "Lorem ipsum dolar semit",
      "profile": 17,
      "locations": [
        23, 45, 56, 78
      ]
    }
  ]
}
</code></pre>

_/api/user/17_
<pre><code>{
  "user': [
    {
      "name": "John Doe",
      "id": 17
      "introduction": "Lorem ipsum dolar semit",
      "is-traveling": true,
    }
  ]
}
</code></pre>

_/api/image/7_
<pre><code>{
  "image': [
    {
      "filename": "BN12345.jpg",
      "id": 7
      "filemime": "application/jpeg",
    }
  ]
}
</code></pre>

The traditional model has one thing that I think that just isn't right. With this type of API the client application needs to request a lot of endpoints before it has one single page fully filled with it's contents.

### The merged endpoints API

The main idea of a merged endpoints API is to move the piecing together computation to the server. With that we win al lot of things, some good, some possibly bad.

* first of all less requests
* no duplicate data that gets sent over the line
* One (a bit longer) request

Let's see how it looks like.

![Merged endpoints REST API implementation](/img/api2.svg)

Above you see the first request. Along with all the different data we get a cache token **xcv45w2**. The response data could look a bit like this:

<pre><code>{
  user: [{
    name: 'Henk',
    id: 12
  }],
  comment: [{
    'Lorem ipsum',
    45
  }],
  location: [{
    'Lorem ipsum',
    '23'
  }],
  journey: [{
    title: 'Name'
  }]
}</code></pre>


The following json object is a representation of what is in the database for the specific token: **xcv45w2**.

<pre><code>{
  user: [1, 4, 6, 9, 14, 34, 67],
  comment: [17, 34, 233, 234, 256],
  location: [45, 46, 47],
  journey: [78],
  image: [122, 123, 124, 125]
}</code></pre>

These are the objects that were once send over the line. These objects won't be send over the lines untill they get deleted or updated. When an object was deleted it needs to send a delete request.

<pre><code>{
  user: [1, 4, 6, 9, 14, 34, 67],
  comment: [17, 34, 233, 234, 256],
  location: [45, 46, 47],
  journey: [78],
  image: [122, 123, 124, 125],
  <strong>deleted: [{
    user: [17]
  }]</strong>
}</code></pre>

## Server side logic idea for Drupal 8

### Creation of the JSON merged endpoint entity
* You create one or more views, these may have different entity types and bundles. You can use contextual filters.
* You create a new config entity of the type 'json merged endpoint' entity. You fill in the label and the path, on which the endpoint can be requested. Than you selected the views that give results to this endpoint. The path variable may hold something like %, so you can use a variable in the path url, this variable will be send to all the selected views.
* You set all the display settings for the view mode 'JSON' of those entity types that you use.
* You can request the path, and the token gets sent along.
