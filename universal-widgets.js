$(function () {
  var cartItems = cart.totalItems();
  if (cartItems > 0) {
    $('nav ul li a').eq(2).html("Cart <img src='full-cart-image.jpg' /> " + cartItems);
  }

  $('body').on('click', function () {//if any button click changes the cart
    cartItems = cart.totalItems();
    if (cartItems > 0) {
      $('nav ul li a').eq(2).html("Cart <img src='full-cart-image.jpg' />" + cartItems);
    } else {
      $('nav ul li a').eq(2).html("Cart");
    }
  });
});
