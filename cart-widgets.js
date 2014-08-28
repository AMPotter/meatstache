$(function () {
  $('.shop-title').hide();

  cart.displayCart();

  $('#empty-cart').on('click', function () {
    cart.emptyCart();
    $('.shop-title').hide();
    cart.displayCart();
  });

  $('#checkout').on('click', function () {
    cart.emptyCart();
    $('#cartempty').text("Thanks for shopping at Meatstache!");
    $('.shop-title').hide();
    cart.displayCart();
  });

  $('tbody').on('change', 'select', function () {
    var productID = $(this).parents('.receipt-line').attr('id');
    cart.setQuantity(productID, $(this).val());
    cart.resetCart();
    cart.displayCart();
    $('body').trigger('click');
  });

});
