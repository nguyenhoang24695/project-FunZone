$(document).ready(function(){
  loadCart();
});


function loadCart(){
  var cart = localStorage.getItem('cart');
  // Kiểm tra sự tồn tại của giỏ hàng.      
  if (cart == null){
    alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
    window.location.href = "ticketlist.html";
  }
  // Parse thông tin giỏ hàng.
  cart = JSON.parse(cart);
  // Kiểm tra thông tin sản phẩm trong giỏ hàng.
  if(cart.products == undefined || cart.products == null){
    alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
    window.location.href = "ticketlist.html";
  }

  var cartContent = '';
  var totalPrice = 0;
  // Đến đây, đảm bảo giỏ hàng tồn tại và có sản phẩm.
  for (var i = 0; i < cart.products.length; i++) {
    cartContent += '<div class="table">';
    cartContent += '<ul>';
    cartContent += '<li class="product-id" style="display: none;">' + cart.products[i].id + '</li>'
    cartContent += '<li class="product-code" style="display: none;">' + cart.products[i].code + '</li>';
    cartContent += '<li class="longpro product-name">' + cart.products[i].name + '</li>';
    cartContent += '<li class="shortpro product-quantity">';
    cartContent += '<span class="minus"><button type="button" class="btn btn-info btnProduct "><i class="fa fa-minus" aria-hidden="true"></i></button></span>';
    cartContent += '<input type="" name="" value="' + cart.products[i].quantity + '" style="width: 50px;">';
    cartContent += '<span class="plus"><button type="button" class="btn btn-info btnProduct "><i class="fa fa-plus" aria-hidden="true"></i></button></span>';
    cartContent += '</li>';
    cartContent += '<li class="shortpro product-price">' + cart.products[i].price + '</li>';
    var totalItemPrice = cart.products[i].quantity * cart.products[i].price;
    cartContent += '<li class="shortpro total-item-price">' + totalItemPrice + '</li>';
    cartContent += '</ul>';
    totalPrice += totalItemPrice;
  }
  cartContent += '<ul>';
  cartContent += '<li class="totalpro">Tổng tiền</li>';
  cartContent += '<li class="shortpro">' + totalPrice + '</li>';
  cartContent += '</ul>';
  $('#cart').html(cartContent);
}

$('#cart').on('click', '.btnProduct', function() {
    // Lấy ra mã sản phẩm từ link.
    var quantity = 1;
    var productId = $(this).parent().parent().parent().children('.product-id').text();
    var productCode = $(this).parent().parent().parent().children('.product-code').text();
    var productName = $(this).parent().parent().parent().children('.product-name').text();
    var productPrice = $(this).parent().parent().parent().children('.product-price').val();
    var productQuantity = $(this).parent().parent().parent().children('.product-quantity').children('input').val(); 
    alert(productId);
    if($(this).parent().attr('class').indexOf('plus') >= 0){
      quantity = +1;
      // alert('Thêm ' + productName + ' thành công.');
    } else if ($(this).parent().attr('class').indexOf('minus') >= 0){       
      quantity = -1 ; // if delete, set quantity = -productQuantity;
    };
    
    location.reload();
    addToCart(productId, productCode, productName, productPrice, quantity);
});


function addToCart(productId, productCode, productName, productPrice, quantity){
  var cart = localStorage.getItem('cart');  
  if (cart == null){
    // Nếu chưa thì tạo mới giỏ hàng với products là danh sách các sản phẩm kèm số lượng.
    if(quantity > 0){
      cart = {
        'products': [
          {
            'id': productId,
            'code': productCode,
            'name': productName,
            'price': productPrice,
            'quantity': quantity
          }
        ]
      } 
    }           
  } else {
    // Nếu đã tồn tại sản phẩm.
    // Parse thông tin giỏ hàng về json object.
    cart = JSON.parse(cart);
    // Kiểm tra sự tồn tại của trường products trong giỏ hàng.
    if(cart.products != undefined && cart.products != null){
      // Kiểm tra sự tồn tại của sản phầm trong giỏ hàng.
      var existsItem = false;
      for (var i = 0; i < cart.products.length; i++) {
        // Nếu tồn tại sản phẩm.
        if(cart.products[i].id == productId){
          existsItem = true;
          // tăng số lượng sản phẩm trong giỏ hàng lên 1.
          cart.products[i].quantity += quantity;
          quantity = cart.products[i].quantity;
          if(quantity <= 0){
            // Xoá bỏ sản phẩm khỏi giỏ hàng trong trường hợp số lượng nhỏ hơn 0.
            cart.products.splice(i, 1);
          }
          break;
        }
      }
      // Nếu không tồn tại sản phẩm trong giỏ hàng.
      if(!existsItem){
        // Thêm mới sản phẩm với quantity default là 1.
        cart.products.push({
          'id': productId,
          'code': productCode,
          'quantity': quantity,
          'name': productName,
          'price': productPrice
        });
      }         
    }               
  }
  // alert('Thêm ' + productName + ' thành công. Số lượng ' + quantity);
  // Lưu lại thông tin giỏ hàng vào localStorage.
  localStorage.setItem('cart', JSON.stringify(cart));
}


function submitCart(){
  var cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);
  
  var arrayProducts = [];
  for (var i = 0; i < cart.products.length; i++) {
    var product = {
      'id': cart.products[i].id,
      'quantity': cart.products[i].quantity         
    };
    arrayProducts.push(product);
  }
  var data = {
    'products': JSON.stringify(arrayProducts)
  } 
  var api_url = "https://funzone-project.herokuapp.com/_api/v1/cart";
  var method = 'POST';

  $.ajax({
    url: api_url,
    type: method,
    data: data,
    success: function(response){                    
      alert("Đặt vé thành công.");
      window.location.href = "ticketlist.html"
      // localStorage.removeItem('cart');
    },
    error: function(response, message){
      alert('Có lỗi xảy ra ' + message);
    }
  });   
}

$('.btnSubmit').click(function () {
  submitCart();
});