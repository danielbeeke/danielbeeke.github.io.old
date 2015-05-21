$(function() {
  $('.card.popup').on('click', function () {
    var that = this
    $(this).addClass('is-clicked')
    $('html').addClass('has-active-popup')

    var oldDimensions = {
      width: $(that).parent().width(),
      height: $(that).parent().height(),
      top: $(that).offset().top - $(window).scrollTop(),
      left: $(that).offset().left
    }

    var transitionImage = $($('.blog-item-background', this)[0].outerHTML)
    transitionImage.addClass('transition-card')
    transitionImage.css({
      width: $(that).parent().width() * 1.36,
      height: $(that).parent().height() * 1.36,
      top: $(that).offset().top - $(window).scrollTop() - 35,
      left: $(that).offset().left - 55
    })
    $('body').append(transitionImage)
    $('body').append('<div class="close-popup"></div>')

    $('html, .close-popup').one('click', function () {
      $('.close-popup').removeClass('show')

      transitionImage.css({
        width: $(that).parent().width() * 1.36,
        height: $(that).parent().height() * 1.36,
        top: $(that).offset().top - $(window).scrollTop() - 35,
        left: $(that).offset().left - 55,
        transform: 'translate(0, 0)'
      })

      $('.transition-card').one('transitionend', function () {
        $(that).removeClass('is-clicked')

        $(that).one('transitionend', function () {
          transitionImage.css(oldDimensions)
          $('html').removeClass('has-active-popup')
          transitionImage.one('transitionend', function () {
            $('.transition-card').removeClass('popup').one('transitionend', function () {
              $('.transition-card').remove()
              $('.close-popup').remove()
            })
          })
        })
      })
    })

    setTimeout(function () {
      transitionImage.addClass('popup')
    }, 100)

    var proportion = parseFloat($(that).data('proportion'))

    var width
    var height

    if ($(window).width() > $(window).height) {
      height = (90 * proportion) + 'vh'
      width = '90vh'
    }
    else {
      width = (90 * proportion) + 'vh'
      height = '90vh'
    }

    $('.transition-card').one('transitionend', function () {
      $('.transition-card').css({
        left: '50%',
        top: '50%',
        width: width,
        height: height,
        transform: 'translate(-50%, -50%)'
      }).one('transitionend', function () {
        $('.close-popup').addClass('show')
      })
    })

    return false
  })
});
