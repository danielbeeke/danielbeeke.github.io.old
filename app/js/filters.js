$(function() {
  'use strict';

  $('.card-filters .tag').on('click', function () {
    $(this).toggleClass('active')

    $('.card').parent().addClass('hidden').removeClass('visible')

    $('.card-overview').addClass('transition-in').addClass('transition-in-prepare')

    setTimeout(function () {
      setFilters()
      setItemsInARowClass()
      removeTransitionClasses()
    }, 300)

    return false
  })

  window.setFilters = function() {
    if ($('.card-filters .tag.active').length) {
      $.each($('.card-filters .tag.active'), function (delta, category) {
        $('.card.' + $(category).attr('data-tag')).parent().addClass('visible').removeClass('hidden')
      })
    }
    else {
      $('.card').parent().removeClass('hidden').addClass('visible')
    }
  }
});
