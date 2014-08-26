$(function() {
  $('#tabs').tabs();

  $('.product-box').children('p').hide();

  $('.store').on('mouseenter', '.product-box', function () {
    $(this).children('p').show('slide', {direction: 'down'}, 100);
  });

  $('.store').on('mouseleave', '.product-box', function () {
    $(this).children('p').hide('slide', {direction: 'down'}, 100);
  });

  $('.store-row').on('mouseleave', function () {
    $(this).children().children('p').hide('slide', {direction: 'down'}, 250);
  });

});
