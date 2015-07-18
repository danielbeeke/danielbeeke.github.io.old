---
title:  "Geo queries, finding squares inside a bounding box"
categories: geo development
image: geo.jpg
color: 013983
published: true
---

For one of our websites we had to create a filter widget to search for squares inside a bounding box. You can find the resulting Drupal 8 module with a bounding box field type, a leaflet field widget and a views exposed filter widget at the bottom of this article.

While starting and thinking about this filter, we thought it would be simple to create the widget, we thought we had it all figured out. In the following image you can see how we thought about it. The idea was simple, we must create two sql expressions, one with the percentage of the overlap of the filter on the article, and one with the percentage of the overlap of the article on the filter. Than we could sort and grab a beer. But it went different. Seems we aren't that good in math.

<img src="/img/search.png">

We (my colleague and I) found it difficult to work with latitudes and longitudes, where some could be negative and others positive. I you know the math, please respond.

<img src="/img/2880986675.gif" class="right">

We finnished the logic in a different wy, we first query on all the things that are inside the filters, than the things that are partly in the filter, and than, all the things that include the filter bounding box.


<a href="https://github.com/studio-fonkel/bbox" target="_blank">Here you can download the module</a>. The module is a work in progress, is it on your own risk.
