$(function() {
  $('.about-me-link').on('click', function () {
    if ($('body').hasClass('about-me')) {
      return false
    }
    $('html').addClass('has-active-card')

    var newPhoto = $($('.author-image')[0].outerHTML)
    newPhoto.addClass('transition-photo')

    newPhoto.css({
      width: $('.author-image').width(),
      height: $('.author-image').height(),
      top: $('.author-image').offset().top - $(window).scrollTop() + 9,
      left: $('.author-image').offset().left
    })

    $('body').append(newPhoto)

    $('body > *:not(.transition-photo)').addClass('transition-out-prepare')
    setTimeout(function () {
      $('body > *:not(.transition-photo)').addClass('transition-out')
      $('.transition-photo').addClass('show')
    }, 100)

    $('body').append('<div class="fifth-grid-start-tester"></div>')
    var newLeft = $('.fifth-grid-start-tester').offset().left

    $('body').append('<h1 class="post-title title-height-tester">About me</h1>')

    var newTitleHeight = $('.title-height-tester').outerHeight()
    $('.title-height-tester').remove()
    setTimeout(function () {
      $('body > *:not(.transition-card)').addClass('transition-out')
    }, 100)

    newPhoto.one('transitionend', function () {
      newPhoto.css({
        left: newLeft,
        top: newTitleHeight + (46 * 2) + 24,
        width: $('.fifth-grid-start-tester').width() + 10,
        height: 400
      }).one('transitionend', function () {
        setTimeout(function () {
          window.location = $('.about-me-link').attr('href')
        }, 300)
      })
    })

    return false
  })
});
