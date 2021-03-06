
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
      $newProductBox.children('.product-box__price').text('$' + product.price.toFixed(2));
      $newProductBox.css('background-image', 'url(images/' + product.image + ')');
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
    localStorage.setItem("cartData", data); //probably
  };

  var getIndexOfProduct = function (productID) {
    var j;
    for (j = 0; j < cartData.length; j++) {
      if (cartData[j].productID === productID) {
        return j;
      }
    }
    return -1;
  }

  this.addToCart = function (productID) {
    //this should run when the "add to cart" button is clicked
    //quantity might always be 1
    //we might be able to pass productID, quantity differently....
    getCartDataFromStorage();

    var quantity = 1;

    var index = getIndexOfProduct(productID);

    if (index > -1) {  //if we found it
      if (cartData[index].quantity >= 9) {
        alert("You cannot buy that many");//maybe replace this with something more elegant
        return;
      }
      cartData[index].quantity += quantity; //add the desired quantity of that thing
    } else {        //if it is a new item
      cartData.push({productID: productID, quantity: quantity});
    }

    storeCartData();

  };

  this.resetCart = function () {//adds a placeholder line
    $newLine = $('.receipt-line').eq(0).clone();
    $('.receipt-line').remove();
    $newLine.prependTo('tbody');
    $('.shop-title').hide();
    $('#cartempty, .nocart').show();
    $('table').hide();
  }



  this.displayCart = function () {
    //This runs when the cart page is loaded
    //First finds cart data from local storage
    getCartDataFromStorage();
    //if cart is empty, no change; (empty message shows)
    if (cartData.length === 0) {
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
      $newLine.children('.product-name').html(name);
      $newLine.children('.product-quantity').children('select').val(cartData[i].quantity);
      $newLine.children('.product-price').text('$' + price.toFixed(2));
      $newLine.children('.subtotal').text('$' + subTotal.toFixed(2));
      $newLine.attr('id', cartData[i].productID);
      $newLine.insertAfter('.receipt-line:last');

    }

    $('.total').text('$' + total.toFixed(2));
    $('#cartempty, .nocart').hide();
    $('.receipt-line').eq(0).remove();
    $('.shop-title').show();
    $('table').css('display', 'table');
  };

  this.returnCartData = function () {//this is just for console-line debugging
    return cartData;
  };

  this.emptyCart = function () {
    cartData = [];
    storeCartData();
  };

  this.setQuantity = function (productID, quantity) {
    var index = getIndexOfProduct(productID);//this does getCartDataFromStorage() for us
    if (quantity === "0") {
      cartData.splice(index, 1);
    } else {
      cartData[index].quantity = Number(quantity);
    }
    storeCartData();
  }

  this.totalItems = function () {
    getCartDataFromStorage();
    var i;
    var totalItems = 0;
    for (i = 0; i < cartData.length; i++) {
      totalItems += Number(cartData[i].quantity);
    }
    return totalItems;
  };
}

/*build database down here, initialize other variables*/

var flankSteak = new Product("Carne Asada Flank Steak",
                            12.50,
                            "beef-flanksteak.jpg",
                            "beef");

var juniperBacon = new Product("Housemade Juniper Bacon",
                            9.25,
                            "pork-juniperbacon.jpg",
                            "pork");

var fakeMustache = new Product("Fake Mustaches",
                            5.99,
                            "stache-fakemustache.jpg",
                            "mustache");

var hogCasing = new Product("Hog Casings",
                            2.99,
                            "pork-hogcasings.jpg",
                            "pork");

var porkTenderloin = new Product("Pork Tenderloin",
                            9.00,
                            "pork-tenderloin.jpg",
                            "pork");

var porkRillettes = new Product("Pork Rillettes",
                            8.00,
                            "pork-rillettes.jpg",
                            "pork");

var italianSausage = new Product("Italian Sausage",
                            7.50,
                            "pork-italiansausage.jpg",
                            "pork");

var porkChops = new Product("Pork Chops",
                            7.25,
                            "pork-chops.jpg",
                            "pork");

var ribeyeSteak = new Product("Ribeye",
                            23.00,
                            "beef-ribeye.jpg",
                            "beef");

var groundBeef = new Product("Ground Beef",
                            7.00,
                            "beef-ground.jpg",
                            "beef");

var beefTenderloin = new Product("Beef Tenderloin",
                            28.00,
                            "beef-tenderloin.jpg",
                            "beef");

var skirtSteak = new Product("Skirt Steak",
                            13.00,
                            "beef-skirtsteak.jpg",
                            "beef");

var meatBalls = new Product("Meatballs",
                            7.75,
                            "beef-meatballs.jpg",
                            "beef");

var mustacheComb = new Product("Mustache Comb",
                            11.25,
                            "stache-comb.jpg",
                            "mustache");

var straightRazor = new Product("Straight Razor",
                            170.00,
                            "stache-straightrazor.jpg",
                            "mustache");

var mustacheWax = new Product("Mustache Wax",
                            8.99,
                            "stache-wax.jpg",
                            "mustache");

var mustacheTrimmer = new Product("Mustache Trimmer",
                            147.99,
                            "stache-trimmer.jpg",
                            "mustache");

var beardOil = new Product("Beard Oil",
                            25.00,
                            "stache-beardoil.jpg",
                            "mustache");


var productDatabase = new Products();
productDatabase.addProduct(flankSteak);
productDatabase.addProduct(juniperBacon);
productDatabase.addProduct(fakeMustache);
productDatabase.addProduct(hogCasing);
productDatabase.addProduct(porkTenderloin);
productDatabase.addProduct(porkRillettes);
productDatabase.addProduct(italianSausage);
productDatabase.addProduct(porkChops);
productDatabase.addProduct(ribeyeSteak);
productDatabase.addProduct(groundBeef);
productDatabase.addProduct(beefTenderloin);
productDatabase.addProduct(skirtSteak);
productDatabase.addProduct(meatBalls);
productDatabase.addProduct(mustacheComb);
productDatabase.addProduct(straightRazor);
productDatabase.addProduct(mustacheWax);
productDatabase.addProduct(mustacheTrimmer);
productDatabase.addProduct(beardOil);

var cart = new Cart();

