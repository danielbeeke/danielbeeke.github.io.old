(function ($) {
$(function() {
  "use strict";

  $('.card-overview .card').on('mousemove', function () {
    $('body').addClass('has-card-hover')
  })

  $('body').on('mousemove', function (e) {
    if (!$(e.target).parents('.card-overview').length) {
      $('body').removeClass('has-card-hover')
    }
  })

  $('.hamburger-menu').on('click', function () {
    var that = this
    $('.post').addClass('transition-post-out').one('transitionend', function () {
      window.location = $(that).attr('href')
    })

    $(that).addClass('fade-out')

    return false
  })

  $('.card-filters .tag').on('click', function () {
    $(this).toggleClass('active')

    $('.card').parent().addClass('hidden').removeClass('visible')

    setTimeout(function () {
      setFilters()
      setItemsInARowClass()
    }, 300)

    return false
  })

  function setFilters() {
    if ($('.card-filters .tag.active').length) {
      $.each($('.card-filters .tag.active'), function (delta, category) {
        $('.card.' + $(category).attr('data-tag')).parent().addClass('visible').removeClass('hidden')
      })
    }
    else {
      $('.card').parent().removeClass('hidden').addClass('visible')
    }
  }

  setTimeout(function () {
    $('.transition-in').removeClass('transition-in')
  }, 10)

  setTimeout(function () {
    $('.transition-in-prepare').removeClass('transition-in-prepare')
  }, 100)

  $('.card').on('click', function () {
    var that = this
    $(this).addClass('is-clicked')
    $('html').addClass('has-active-card')
    var transitionImage = $($('.blog-item-background', this)[0].outerHTML)
    transitionImage.addClass('transition-card')

    transitionImage.css({
      width: $(that).width() * 1.36,
      height: $(that).height() * 1.36,
      top: $(that).offset().top - $(window).scrollTop() - 24,
      left: $(that).offset().left - 47
    })

    $('body').append(transitionImage)

    setTimeout(function () {
      transitionImage.addClass('show')
    }, 100)

    $('body').append('<div class="fifth-grid-start-tester"></div>')

    var newLeft = $('.fifth-grid-start-tester').offset().left

    $('body > *:not(.transition-card)').addClass('transition-out-prepare')

    $('body').append('<h1 class="post-title title-height-tester">' + $('.blog-item-title', that).text() + '</h1>')

    var newTitleHeight = $('.title-height-tester').outerHeight()

    $('.title-height-tester').remove()
    setTimeout(function () {
      $('body > *:not(.transition-card)').addClass('transition-out')
    }, 100)

    $('.transition-card').one('transitionend', function () {
      $('.transition-card').css({
        left: newLeft,
        top: newTitleHeight + (46 * 2) + 78,
        width: $('.fifth-grid-start-tester').width(),
        height: 400
      }).one('transitionend', function () {
        window.location = $('.blog-item-link', that).attr('href')
      })
    })
    return false
  })

  $(document).keydown(function(e) {
    if(e.which == 59 && e.ctrlKey) {
      $('body').toggleClass('has-grid-overlay-enabled')
    }
  })

  $(window).on('resize', function () {
    setItemsInARowClass()
  })

  function setItemsInARowClass() {
    var firstCard = $('.padder:first')
    var margin = parseInt(firstCard.css('margin-right'))
    var totalCards = $('.card-overview .padder').length
    var cardsInRow = Math.floor(($('.card-overview').width() + margin) / (firstCard.outerWidth()))
    var rowsInGrid = Math.floor(($('.card-overview').height() + margin) / (firstCard.outerHeight()))

    $('.padder.last').removeClass('last')

    var visibleCounter = 0

    $.each($('.card-overview .card'), function (delta, card) {
      if ($(card).parent().hasClass('visible')) {

        if ((visibleCounter % cardsInRow) + 1 == cardsInRow) {
          $(card).parent().addClass('last')
        }

        visibleCounter++
      }

      var cardIndex = delta + 1
      var rowIndex = Math.floor(delta / cardsInRow) + 1
      var cardsInLastRow = cardsInRow - ((cardsInRow * rowsInGrid) - totalCards)

      var topShadow = rowIndex > 1
      var leftShadow = delta % cardsInRow > 0
      var rightShadow = delta % cardsInRow != (cardsInRow - 1) && cardIndex != totalCards
      var bottomShadow = true

      if (
        rowsInGrid == rowIndex ||
        (rowsInGrid - 1) == rowIndex && ((delta % cardsInRow) + 1) > cardsInLastRow)
      {
        bottomShadow = false
      }

      if (leftShadow && rightShadow) {
        $(this).attr('data-horizontal-shadow', 'both')
      }
      else if (leftShadow) {
        $(this).attr('data-horizontal-shadow', 'left')
      }
      else if (rightShadow) {
        $(this).attr('data-horizontal-shadow', 'right')
      }
      else {
        $(this).attr('data-horizontal-shadow', 'none')
      }

      if (topShadow && bottomShadow) {
        $(this).attr('data-vertical-shadow', 'both')
      }
      else if (topShadow) {
        $(this).attr('data-vertical-shadow', 'top')
      }
      else if (bottomShadow) {
        $(this).attr('data-vertical-shadow', 'bottom')
      }
      else {
        $(this).attr('data-vertical-shadow', 'none')
      }
    })
  }

  setFilters()
  setItemsInARowClass()
});
}(jQuery));
