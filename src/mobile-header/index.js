document.addEventListener('DOMContentLoaded', function () { 
  $( window ).scroll(function() {
    if ($(this).scrollTop() > 0)
    {
      $('.mobile-header__fix, .mobile-nav__button').css({'top': '0' });
      $('.mobile-header__static-top .row').fadeOut('slow');
    } else {
      $('.mobile-header__fix, .mobile-nav__button').css({'top': '25px' });
      $('.mobile-header__static-top .row').fadeIn('slow');
    }
  });
}); 