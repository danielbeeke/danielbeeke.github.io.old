$(function() {
  'use strict';

  $('.card-filters .tag').on('click', function () {
    $(this).toggleClass('active')

    $('.card-overview').addClass('transition-in').addClass('transition-in-prepare')

    setTimeout(function () {
      setFilters()
    }, 300)

    return false
  })

  window.setFilters = function() {
    var itemsToSetActiveByFilter = []
    var itemsToSetActiveBySearch = []
    var itemsToSetActive = []

    $('.card').parent().addClass('hidden').removeClass('visible')

    if ($('.card-filters .tag.active').length) {
      $.each($('.card-filters .tag.active'), function (delta, category) {
        $.each($('.card.' + $(category).attr('data-tag')), function (cardDelta, card) {
          itemsToSetActiveByFilter.push(card)
        })
      })
    }
    else {
      $.each($('.card'), function (cardDelta, card) {
        itemsToSetActiveByFilter.push(card)
      })
    }

    if (window.searchResults && window.searchResults.length) {
      $.each(window.searchResults, function (delta, id) {
        itemsToSetActiveBySearch.push($('[data-id="' + id + '"]')[0])
      })
    }

    if ($('.search-field.has-value').length) {
      var arrays = [itemsToSetActiveByFilter, itemsToSetActiveBySearch]

      itemsToSetActive = arrays.shift().reduce(function(res, v) {
          if (res.indexOf(v) === -1 && arrays.every(function(a) {
              return a.indexOf(v) !== -1
          })) res.push(v)
          return res
      }, [])
    }
    else {
      itemsToSetActive = itemsToSetActiveByFilter
    }

    $.each(itemsToSetActive, function (delta, item) {
      $(item).parent().addClass('visible').removeClass('hidden')
    })

    setItemsInARowClass()
    removeTransitionClasses()
  }

});
