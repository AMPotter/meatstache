$(function() {
  productDatabase.buildStorefront();


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

  $('.store').on('click', 'button', function () {
    var productID = $(this).parent().attr('id');
    var quantity = 1;
    console.log("calling add to cart on product " + productID);
    cart.addToCart(productID);
    $(this).text("ADDED. More?").fadeOut(1000, function () {
      $(this).text("Add to cart").show();
    });
  });

});
