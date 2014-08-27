$(function() {
  $('#tabs').tabs();

  $('.product-box').children('p, h1').hide();

  $('.store').on('mouseenter', '.product-box', function () {
    $(this).children('p, h1').show('slide', {direction: 'down'}, 100);
  });

  $('.store').on('mouseleave', '.product-box', function () {
    $(this).children('p, h1').hide('slide', {direction: 'down'}, 100);
  });

  $('.store-row').on('mouseleave', function () {
    $(this).children().children('p, h1').hide('slide', {direction: 'down'}, 250);
  });

});
