// $(function() {
//   $('.card.blog-item').on('click', function () {
//     var that = this
//     $(this).addClass('is-clicked')
//     $('html').addClass('has-active-card')
//
//     var transitionImage = $($('.blog-item-background', this)[0].outerHTML)
//     transitionImage.addClass('transition-card')
//
//     var width = $(that).parent().width() * 1.36
//     var height = $(that).parent().height() * 1.36
//
//     transitionImage.css({
//       width: width,
//       height: height,
//       top: $(that).offset().top - ((height - $(that).parent().height()) / 2) + (27 * 1.36),
//       left: $(that).offset().left - ((width - $(that).parent().width()) / 2)
//     })
//     $('body').append(transitionImage)
//
//
//     setTimeout(function () {
//       transitionImage.addClass('show')
//     }, 100)
//
//     $('.page-wrapper').prepend('<div class="fifth-grid-start-tester"></div>')
//     var newLeft = $('.fifth-grid-start-tester').offset().left
//     $('body > *:not(.transition-card)').addClass('transition-out-prepare')
//
//     $('.page-wrapper').prepend('<h1 class="post-title title-height-tester">' + $('.blog-item-title:first', that).text() + '</h1>')
//
//     var newTitleHeight = $('.title-height-tester').outerHeight()
//     $('.title-height-tester').remove()
//     setTimeout(function () {
//      $('body > *:not(.transition-card)').addClass('transition-out')
//     }, 100)
//
//     $('.transition-card').one('transitionend', function () {
//      $('.transition-card').css({
//        left: newLeft,
//        top: newTitleHeight + (46 * 2) + 79,
//        width: $('.fifth-grid-start-tester').width() + 10,
//        height: 400
//      }).one('transitionend', function () {
//        //window.location = $('.blog-item-link', that).attr('href')
//      })
//     })
//
//     return false
//   })
// });
