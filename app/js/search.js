$(function() {
  'use strict';

  $('.search-icon').on('click', function () {
    $('.search-field').val('').change()
  })

  var debounce

  $('.search-field').on('change keyup', function () {
    $('.search-wrapper').addClass('is-searching')

    var searchString = $('.search-field').val()
    if (searchString) {
      $('.search-field').addClass('has-value')
    }
    else {
      $('.search-field').removeClass('has-value')
    }

    clearTimeout(debounce)

    debounce = setTimeout(function () {
      searchSite()
    }, 700)
  })

  function searchSite() {
    var searchString = $('.search-field').val()

    var url = 'https://api.github.com/search/code?q=' + searchString + '+in:file+repo:danielbeeke/danielbeeke.github.io+extension:md'

    $.ajax({
      dataType: 'json',
      url: url,
      headers: {
        // This is used to go around the rate limit for anon users.
        'Authorization': make_base_auth('searcherfor', 'thisaccountdoesnothing')
      },
      success: function (data) {
        window.searchResults = []

        $('.search-wrapper').removeClass('is-searching')

        $.each(data.items, function (delta, item) {
          var pathSplitted = item.path.split('/')

          // We are only interested in posts.
          if (pathSplitted[1] === '_posts') {
            pathSplitted.splice(0, 1)
            var id = pathSplitted.join('/')

            window.searchResults.push(id)
          }
        })

        setFilters()
      }
    })
  }

  function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(unescape(encodeURIComponent(tok)));
    return 'Basic ' + hash;
  }

});
