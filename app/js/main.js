(function ($) {

  "use strict";

  $('.card-overview .card').on('mousemove', function () {
    $('body').addClass('has-card-hover')
  })

  $('body').on('mousemove', function (e) {
    if (!$(e.target).parents('.card-overview').length) {
      $('body').removeClass('has-card-hover')
    }
  })

  $('.card').on('click', function () {
    $(this).addClass('is-clicked')

    $('.blog-item-link', this).one('transitionend', function () {
      // window.location = $(this).attr('href')
    })
    return false
  })


  $(window).on('resize', function () {
    setItemsInARowClass()
  })

  function setItemsInARowClass() {
    var firstCard = $('.card:first')
    var margin = parseInt(firstCard.css('margin-left'))
    var totalCards = $('.card-overview .card').length
    var cardsInRow = Math.floor($('.card-overview').width() / (firstCard.width() + margin * 2))
    var rowsInGrid = Math.floor($('.card-overview').height() / (firstCard.height() + margin * 2))

    $.each($('.card-overview .card'), function (delta, card) {
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

  setItemsInARowClass()

}(jQuery));
