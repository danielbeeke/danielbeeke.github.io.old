$(function() {
  'use strict';

  $('.card-filters .tag').on('click', function () {
    $(this).toggleClass('active')
    window.location.hash = ''
    $('.card-overview').addClass('transition-in').addClass('transition-in-prepare')

    setTimeout(function () {
      setFilters()
    }, 300)

    return false
  })

  $('.clear-filters').on('click', function () {
    $('.tag.active').removeClass('active')
    return false
  })

  window.setFilters = function() {
    var itemsToSetActiveByFilter = []
    var itemsToSetActiveBySearch = []
    var itemsToSetActive = []
    var categories = []

    if (window.location.hash) {
      var hash = window.location.hash.substr(1)
      categories = hash.split('+')

      $.each(categories, function (delta, category) {
        $('[data-tag="' + category + '"]').addClass('active')
        setTimeout(function () {
          $('[data-tag="' + category + '"]').addClass('clicked')
        }, 400)
      })
    }

    $('.card').parent().addClass('hidden').removeClass('visible')

    if ($('.card-filters .tag.active').length) {
      $.each($('.card-filters .tag.active'), function (delta, category) {
        categories.push($(category).attr('data-tag'))
      })
    }

    if (categories.length) {
      $('.clear-filters').addClass('visible')
      if (!window.location.hash) {
        window.location.hash = categories.join('+')
      }
      $.each(categories, function (delta, category) {
        $.each($('.card.' + category), function (cardDelta, card) {
          itemsToSetActiveByFilter.push(card)
        })
      })
    }
    else {
      $('.clear-filters').removeClass('visible')
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
