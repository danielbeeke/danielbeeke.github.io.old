$(function() {
  'use strict';

  $('.card-overview .card').on('mousemove', function () {
    $('body').addClass('has-card-hover')
  })

  $('body').on('mousemove', function (e) {
    if (!$(e.target).parents('.card-overview').length) {
      $('body').removeClass('has-card-hover')
    }
  })

  $('.hamburger-menu, .post .tag').on('click', function () {
    var that = this
    $('.post').addClass('transition-post-out').one('transitionend', function () {
      window.location = $(that).attr('href')
    })

    $('.hamburger-menu').addClass('fade-out')

    $(this).addClass('clicked')

    return false
  })

  $(document).keydown(function(e) {
    if(e.which === 59 && e.ctrlKey) {
      $('body').toggleClass('has-grid-overlay-enabled')
    }
  })

  $(window).on('resize', function () {
    setItemsInARowClass()
  })

  window.removeTransitionClasses = function () {
    setTimeout(function () {
      $('.transition-in').removeClass('transition-in')
    }, 10)

    setTimeout(function () {
      $('.transition-in-prepare').removeClass('transition-in-prepare')
    }, 100)
  }

  setFilters()
  setItemsInARowClass()
  removeTransitionClasses()
});
