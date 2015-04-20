---
title:  "Multi grid span"
categories: scss workflow
image: grid.jpg
color: 04629f
---

In this article I will tell about a little trick that makes it easy to create a (simple) responsive site with little code.

For quite a while I have been using singularity. It is a very flexibel sass grid system. You can create symmetric grids and also asymmetric grids. With asymmetric grids it is possible to create a responsive sites with just under 30 lines of code.

This trick is not always possible, but it is for example possible when you have a design with 12 columns, where on each breakpoint (from desktop to mobile) you remove columns from the sides.

<pre><code>.post {
  @include grid-span(5, 2);
  transition: transform $speed $easing;
  transform: translateX(0);
  padding-bottom: 100px;

  .site-author {
    transition: opacity $speed $easing;
    opacity: 1;
    margin-top: 4px;

    h1 {
      margin-top: 0;
    }
  }
}
</code></pre>

Vivamus quis ipsum molestie, sodales lorem nec, scelerisque enim. Vivamus a bibendum diam. Nam id commodo arcu. Donec lectus tellus, dapibus eu neque at, auctor tempus ligula. Praesent hendrerit massa ac ligula gravida commodo. Etiam id dictum eros. Nulla finibus metus non viverra ultricies. Cras commodo, est eget suscipit cursus, dolor lacus vulputate dolor, eget suscipit est augue id dui.

<img src="/img/drupal.jpg" class="tiny">

Nulla tristique felis in ultrices porttitor. Ut id tortor magna. Proin ornare dui sed velit porttitor luctus. Aliquam molestie orci purus, sed semper erat ultricies a. Quisque condimentum condimentum velit a scelerisque. Curabitur tempus a elit vitae euismod. Etiam commodo, lectus quis tristique dapibus, nibh arcu dapibus nibh, vitae pellentesque augue leo a nisi. Proin ultricies eget erat sed aliquam. Sed faucibus finibus tellus, sit amet pellentesque dolor hendrerit ut. Quisque maximus suscipit consequat. Proin congue ante scelerisque, luctus arcu in, pellentesque justo. Nulla nec arcu ac lacus aliquam laoreet id ac ipsum. Integer hendrerit risus euismod ex porta mattis. Aliquam dolor purus, blandit consectetur metus in, blandit dapibus diam. Nulla dignissim odio id ornare fermentum.

Vivamus vitae nulla luctus quam dignissim mattis in id nunc. Proin suscipit augue mi, rutrum pulvinar eros laoreet quis. Nam tincidunt orci id lectus finibus aliquam in pretium nunc. Pellentesque vel felis et nulla viverra semper. Donec ultricies tortor non est hendrerit mattis. Quisque consectetur turpis purus, sit amet pretium nisi vestibulum vel. Vestibulum a dolor metus. Etiam at neque viverra, condimentum dolor aliquam, cursus est. Aliquam eleifend massa eu arcu luctus, et ultricies orci lobortis. Fusce id porttitor erat, nec condimentum dui. Integer ultrices lectus augue, blandit eleifend elit ultricies in. Sed non justo eleifend sem posuere egestas at et nisi. Vivamus a vestibulum metus. Curabitur quam purus, aliquet lacinia turpis vitae, hendrerit venenatis nulla.
