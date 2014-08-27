
function Product(name, price, image, category) {
  this.name = name;
  this.price = price;
  this.image = image;
  this.category = category;
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
  //method to fill in the store page??
  this.buildStorefront = function () {//Assumes at least 1 product in each category
    var itemsInTabs = [0, 0, 0];
    var product = {};
    var i = 0;
    var tabID = '';
    var column = 0;
    var $newProductBox;
    var $newRow;
    for (i = 0; i < products.length; i++) {
      product = products[i];
      if (product.category === "beef") {
        tabID = "tabs-1";
        column = ++itemsInTabs[0];
      } else if (product.category === "pork") {
        tabID = "tabs-2";
        column = ++itemsInTabs[1];
      } else if (product.category === "mustache") {
        tabID = "tabs-3";
        column = ++itemsInTabs[2];
      } else {
        alert("Bad item category --- check the database");//should never get here
      }

      if ((column - 1) % 3 === 0) { //we need a new row
        $newRow = $('#' + tabID + ' .store-row').eq(0).clone();
        $newRow.empty();
        $('#' + tabID).append($newRow);
      }

      $newProductBox = $('.product-box').eq(0).clone();
      $newProductBox.children('.product-box__description').text(product.name);
      $newProductBox.children('.product-box__price').text('$' + product.price);
      $newProductBox.css('background-image', 'url(' + product.image + ')');
      $newProductBox.attr('id', i);
      $('#' + tabID + " .store-row:last").append($newProductBox);
    }

    //clean up template rows
    $('#tabs-1 .store-row').eq(0).remove();
    $('#tabs-2 .store-row').eq(0).remove();
    $('#tabs-3 .store-row').eq(0).remove();



  };
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
    var index = -1; //recreating var index = cartData.indexOf(productID)
    var j;
    for (j = 0; j < cartData.length; j++) {
      if (cartData[j].productID === productID) {
        index = j;
        break;
      }
    }

    if (index > -1) {  //if we found it
      cartData[index].quantity += quantity; //add the desired quantity of that thing
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
    //if cart is empty, no change; (empty message shows)
    if (cartData.length === 0) {
      $('#cartempty, .nocart').show();
      $('tr').hide();
      return;
    }
    //if it's full, fill it in
    var i;
    var $newLine;
    var name = "";
    var quantity = 0;
    var price = 0.0;
    var subTotal = 0.0;
    var total = 0.0;
    for (i = 0; i < cartData.length; i++) {
      $newLine = $('.receipt-line').eq(0).clone();//the 0th is a template
      name = productDatabase.getProduct(cartData[i].productID).name;
      quantity = cartData[i].quantity;
      price = productDatabase.getProduct(cartData[i].productID).price;
      subTotal = quantity * price;
      total += subTotal;
      $newLine.children('.product-name').text(name);
      $newLine.children('.product-quantity').text(cartData[i].quantity);
      $newLine.children('.product-price').text('$' + price);
      $newLine.children('.subtotal').text(subTotal);
      $newLine.insertAfter('.receipt-line:last');
    }
    $('.total').text('$' + total);
    $('#cartempty, .nocart').hide();
    $('.receipt-line').eq(0).remove();
    $('.shop-title').show();
    $('tr').css('display', 'table-row');
  };

  this.returnCartData = function () {//this is just for console-line debugging
    return cartData;
  };

  this.emptyCart = function () {
    cartData = [];
    storeCartData();
  };

  this.totalItems = function () {
    getCartDataFromStorage();
    var i;
    var totalItems = 0;
    for (i = 0; i < cartData.length; i++) {
      totalItems += cartData[i].quantity;
    }
    return totalItems;
  };
}

/*build database down here, initialize other variables*/

var flankSteak = new Product("Carne Asada Flank Steak",
                            10.99,
                            "beef-220x220.jpg",
                            "beef");

var bacon = new Product("Housemade Juniper Bacon",
                            8.99,
                            "pork-220x220.jpg",
                            "pork");

var mustaches = new Product("Fake Mustaches",
                            5.99,
                            "mustache-220x220.jpg",
                            "mustache");

var productDatabase = new Products();
productDatabase.addProduct(flankSteak);
productDatabase.addProduct(bacon);
productDatabase.addProduct(mustaches);

var cart = new Cart();

