$(function () {
  var cartItems = cart.totalItems();
  if (cartItems > 0) {
    $('nav ul li a').eq(2).html("Cart (" + cartItems + ")");
  }

  $('body').on('click', function () {//if any button click changes the cart
    cartItems = cart.totalItems();
    if (cartItems > 0) {
      $('nav ul li a').eq(2).html("Cart (" + cartItems + ")");
    } else {
      $('nav ul li a').eq(2).html("Cart");
    }
  });
});
