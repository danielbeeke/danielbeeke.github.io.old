$(function() {
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
});
