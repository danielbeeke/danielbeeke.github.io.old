---
title:  "Merged endpoint API's, an idea."
categories: development API
image: apis.jpg
color: c9ac37
published: true
---

How to create an API that is performant for mobile devices? That is a question that is bugging me for over a year.

I think tools like Drupal, or angular are on a good road, but not for mobile apps. Hitting the server 20 times for 10 second of using an app, doesn't seem such a good idea to me.

I have been thinking about merged endpoints. I will explain it with an example of the app that has made me think about it. A travel blog. Suppose we have a SAAS travel blog, everyone can create a blog, and a blog is located at johndoe.travelblog.cool. Let's say that we are creating the frontend plain javascript with the help of (a lot) libaries.

When traveling in the jungle or desert, it would be great if you could still write your blog, and when there is a little, very little of access to the internet available, it would be great if your blog would be posted, and if you could view the comments that are posted on it.

Server trips are expensive, just like world trips. It would be better to serve all the stuff in one single request. See [http://stackoverflow.com/questions/3138371/very-large-http-request-vs-many-small-requests](http://stackoverflow.com/questions/3138371/very-large-http-request-vs-many-small-requests), other people are having the same thoughts. I don't know for sure if a single request is better, but for this idea let's go with it.

What if we could serve multiple traditional REST API endpoints through a merged endpoint. For example we have the following endpoints: user, journey, comment, location and photo. What if we would have something like merged/journey/{slug} which would give all the objects that we need for that specified slug. So calling that endpoint would return photo's, locations, comments, users, and the journey.

Okay, so we could have one endpoint for getting all the data needed for one page view in the app. Hooray! Now caching becomes a challenge. Let's say we are using localstorage, session storage or no storage as cache mechanism. Every device requests the merged endpoint every time that it wants to display a certain route. The device sends along a cache token (got that one from the first request) and recieves all the data. If the device is incapable of local/session storage, the token get's lost all the time (no storage) and the data is requested over and over again, it's working for old devices, yess.

Now the newer devices, how we do that? The device sends the token along with the request, the server checks if it knows the token, en sees what objects were send. It checks the timestamp of the last update of the cache token object, which holds all the id's that were sent over the line, it checks all those objects, specifically their update time and returns all the new or updated objects along with delete requests for removed items.

So while visiting the blog of John Doe, the first time the device requests merged/journey/john-doe-in-china en recieves all the objects, locally, the javascript stores the object in the local storage, and displays the page.

Next time you are visiting John Doe's page the request is done, the cache token is sent along, and only the new objects or the updated objects, or the removed object id's are send in the response.

When implementing this idea, you could also base64 your images, or atleast your thumbnails, so the page loading will be very fast when the data is arrived. I think this would serve good for an app or a website where you have a throbber.

I want to create this for Drupal 8, I have a prototype working in Drupal 7. What are you thinking about such a system? Do you see downfalls? Or other ideas?
