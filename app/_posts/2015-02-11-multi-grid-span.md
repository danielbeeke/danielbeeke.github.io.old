---
title:  "Multi grid span"
categories: scss workflow
image: grid.jpg
color: 04629f
published: false
---

In this article I will tell about a little trick that makes it easy to create a (simple) responsive site with little code.

For quite a while I have been using [singularity](https://github.com/at-import/Singularity). It is a very flexibel [sass](http://sass-lang.com) grid system. You can create symmetric grids and also asymmetric grids. With asymmetric grids it is possible to create a responsive sites with just under 30 lines of code.

This trick is not always possible, but it is for example possible when you have a design with 12 columns, where on each breakpoint (from desktop to mobile) you remove columns from the sides.

The general idea is to tell via the function multi-grid-span the size of your div for desktop. And than size it down for other view ports. Most of the time a 4 column grid will resize to a 2 column grid and than on mobile to a 1 column grid.

The grid initialisation:

<pre><code>@include add-grid(0 0 0 0 0 1 1 4 4 1 1 0 0 0 0 0);
@include add-grid(0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 at $mobile);
@include add-grid(0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 at $tablet);
@include add-grid(0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 at $laptop);
</code></pre>

An example of a multi-grid-span:

<pre><code>@mixin multi-grid-span($Span, $Location, $clear: false, $grid: false, $gutter: false, $gutter-style: false, $from: false, $context: false) {
  @include breakpoint($mobile) {
    @if ($context == 'paragraphs') {
      @if ($Span == 3 or $Span == 6 or $Span == 6) {
        @include isolation-span(6, 6, $clear, $grid, $gutter, $gutter-style, $from);
      }

      @if ($Span == 4 or $Span == 8) {
        @include isolation-span(8, 5, $clear, $grid, $gutter, $gutter-style, $from);
      }
    }
    @else {
      @include isolation-span(8, 5, $clear, $grid, $gutter, $gutter-style, $from);
    }
  }

  @include breakpoint($tablet) {
    @include isolation-span($Span, $Location, $clear, $grid, $gutter, $gutter-style, $from);
  }

  @include breakpoint($laptop) {
    @include isolation-span($Span, $Location, $clear, $grid, $gutter, $gutter-style, $from);
  }

  @include breakpoint($desktop) {
    @include isolation-span($Span, $Location, $clear, $grid, $gutter, $gutter-style, $from);
  }
}
</code></pre>

In the example I also added a variable $context, with that I can control the rules that apply to that part of the site.
