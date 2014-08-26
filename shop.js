
function Product(name, description, price, image) {
  this.name = name;
  this.description = description;
  this.price = price;
  this.image = image;
  //maybe add a product ID?
  //Maybe a category (beef, pork, mustache) if we want to put it on the correct display tab dynamically
}

function Products() {
  var products = [];//starts with an empty array... stuff must be added manually

  this.addProduct = function (product) {
    //Adds a product to the array
    products.push(product);
    //maybe return its ID?
  };

  this.getID = function (product) {
    //Finds the ID of a product (we may not need this)
    return products.indexOf(product);
  };

  this.getProduct = function (ID) {
    //Returns the product at position ID
    //should probably add some error checking here (ID too big or not a number)
    return products[ID];
  };

  //Maybe methods that let people modify products, etc., if needed
}

function Cart() {
  var cartData = []; //ALWAYS EMPTY ON PAGE LOAD; Should contain things like
                     //{productID: 1, quantity: 1}

  var getCartDataFromStorage = function () {
    var data = localStorage.getItem("cartData");
    if (data !== null) {//null is not an array, and we need cartData to have a length and other methods
      cartData = JSON.parse(data);
    }
  };

  var storeCartData = function () {
    var data = JSON.stringify(cartData);
    console.log(data);
    localStorage.setItem("cartData", data); //probably
  };

  this.addToCart = function (productID, quantity) {
    //this should run when the "add to cart" button is clicked
    //quantity might always be 1
    //we might be able to pass productID, quantity differently....
    getCartDataFromStorage();
    var index = -1;
    var j;
    for (j = 0; j < cartData.length; j++) {
      if (cartData[j].productID === productID) {
        index = j;
        break;
      }
    }

    if (index > -1) {  //if we found it
      cartData[index].quantity += quantity; //Increment the quantity of that thing
    } else {        //if it is a new item
      cartData.push({productID: productID, quantity: quantity});
    }

    storeCartData();

    console.log(cartData);
  };

  this.displayCart = function () {
    //This runs when the cart page is loaded
    //First finds cart data from local storage
    getCartDataFromStorage();
    //if cart is empty, display a message
    //if it's full, fill it in
    /*PSEUDOCODE DOWN HERE
    var i;
    for (i = 0; i < cartData.length; i++) {
      var $newLine = $('.receipt')[0].clone();
      $newLine.children('.description')
        .text(products[cartData[i].productID].name);
        ETC. for all the child fields
      $(.recepit-box).append($newLine);//or whatever the syntax is here
    }
    */
  };

  this.returnCartData = function () {//this is just for console-line debugging
    return cartData;
  };
}

/*build database down here, add stuff that does things*/

var flankSteak = new Product("Carne Asada Flank Steak",
                            "Perfect for broiling with any of our delicious meat rubs",
                            10.99,
                            "beef-220x220.jpg");

var bacon = new Product("Housemade Juniper Bacon",
                            "Eat it for breakfast or any meal",
                            8.99,
                            "pork-220x220.jpg");

var mustaches = new Product("Fake Mustaches",
                            "Wear it on your face for that extra flair",
                            5.99,
                            "mustache-220x220.jpg");

var productDatabase = new Products();
productDatabase.addProduct(flankSteak);
productDatabase.addProduct(bacon);
productDatabase.addProduct(mustaches);

var cart = new Cart();

$('.store').on('click', 'button', function () {
  var productID = $(this).parent().attr('id');
  var quantity = 1;
  console.log("calling add to cart on product " + productID);
  cart.addToCart(productID, quantity);
  $(this).text("ADDED. More?").fadeOut(1000, function () {
    $(this).text("Add to cart").show();
  });
});
