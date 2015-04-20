$(function() {
  'use strict';

  window.setItemsInARowClass = function() {
    var firstCard = $('.padder.visible:first')
    var marginPx = firstCard.css('padding-right')
    var margin = parseInt(marginPx)
    var totalCards = $('.card-overview .padder.visible').length
    var cardsInRow = Math.floor(($('.card-overview').width() + margin) / (firstCard.outerWidth()))
    var rowsInGrid = Math.floor(($('.card-overview').height() + margin) / (firstCard.outerHeight()))

    $('.padder.last').removeClass('last')

    var visibleCounter = 0


    $.each($('.card-overview .padder.visible .card'), function (delta, card) {
      if ($(card).parent().hasClass('visible')) {

        if ((visibleCounter % cardsInRow) + 1 === cardsInRow) {
          $(card).parent().addClass('last')
        }

        visibleCounter++
      }

      var cardIndex = delta + 1
      var rowIndex = Math.floor(delta / cardsInRow) + 1
      var cardsInLastRow = cardsInRow - ((cardsInRow * rowsInGrid) - totalCards)

      var topShadow = rowIndex > 1
      var leftShadow = delta % cardsInRow > 0
      var rightShadow = delta % cardsInRow !== (cardsInRow - 1) && cardIndex !== totalCards
      var bottomShadow = true

      if (
        rowsInGrid === rowIndex ||
        (rowsInGrid - 1) === rowIndex && ((delta % cardsInRow) + 1) > cardsInLastRow)
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
});
