var TICKET_API = "http://localhost:3000/_api/v1/products";

$(document).ready(function(){
	loadTicket(id);
});

function loadTicket(id) {
	$.ajax({
		url: TICKET_API + '/' + id,
		type: 'GET',
		success: function(response) {
			var ticket = JSON.parse(this.response);
				  
  				htmlContent += '<div class="col-lg-8">'
  				htmlContent += '<div id="prodInfo">'
  				htmlContent += '<h2>' + ticket.pName + '</h2>'
  				htmlContent += '<div class="critical-info">'
				  htmlContent += '<i class="fa fa-bookmark-o" aria-hidden="true"></i>'
				  htmlContent += '&nbsp; Mã dịch vụ: '+ ticket.pId
  				htmlContent += '</div>'
  				htmlContent += '<div class="prod-intro">'
  				htmlContent += '<i class="fa fa-book" aria-hidden="true"></i>'
				  htmlContent += '&nbsp;' + ticket.pDescription + '</div>'
  				htmlContent += '</div>'
  				htmlContent += '</div>'

  				htmlContent += '<div class="col-lg-4">'
  				htmlContent += '<div id="booking-bar" class="vue-affix affix">'
  				htmlContent += '<div class="booking-bar-content">'
  				htmlContent += '<div class="price">'
  				htmlContent += '<h5 class="pull-left">Giá từ</h5>'
  				htmlContent += '<div class="pull-right">'
  				htmlContent += '<div class="product-pricing">'
  				htmlContent += '<h4>VND </h4>'
  				htmlContent += '<h2 class="text-primary">' + ticket.pPrice + '</h2>'
  				htmlContent += '</div>'
  				htmlContent += '</div>'
  				htmlContent += '<div class="clearfix"></div>'
  				htmlContent += '<div class="space"></div>'
          htmlContent += '<div class="btn btn-info btn-block btn-lg">'
          htmlContent += '<span>'
          htmlContent += '<i class="fa fa-ticket" aria-hidden="true"></i>&nbsp;Đặt vé'
          htmlContent += '</span>'
          htmlContent += '</div>'
  				htmlContent += '</div>'
  				htmlContent += '<div class="space"></div>'
          htmlContent += '<div class="btn btn-outline-secondary btn-lg btn-block">'
          htmlContent += '<span>'
          htmlContent += '<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;Thêm vé'
          htmlContent += '</span>'
          htmlContent += '</div>'
  				htmlContent += '</div>'
  				htmlContent += '</div>'
  				htmlContent += '</div>'
      $('.img-bg-full').css("background-image", url(pImage));
			$('#result').html(htmlContent);
		},
		error: function(response){
			alert('Đã xảy ra lỗi.');
      window.location.href = "ticketlist.html";  
		}, 
	});
};

$('#result').on('click', '.btn', function() {
      // Lấy ra mã sản phẩm từ link.
      var productId = $(this).children('.col-lg-8').children().children('.critical-info').text();
      var productName = $(this).children('.col-lg-8').children('h2').text();
      var productPrice = $(this).children('.col-lg-4').children().children().children().children().chill
      ().children('.text-primary').text();
      

      if($(this).children().attr('class').indexOf('fa-plus') >= 0){       
        quantity = +1;
      } else if ($(this).children().attr('class').indexOf('fa-minus') >= 0){       
        quantity = -1; // if delete, set quantity = -productQuantity;
      }  
      
      addToCart(productId, productName, productPrice, quantity);
    });


function bookTicket(){
  addToCart();
  window.location.href = "cart.html";
};

function addToCart(productId, productName, productPrice, quantity){
  var cart = localStorage.getItem('cart');  
  if (cart == null){
    // Nếu chưa thì tạo mới giỏ hàng với products là danh sách các sản phẩm kèm số lượng.
    if(quantity > 0){
      cart = {
        'products': [
          {
            'id': productId,
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
          'quantity': quantity,
          'name': productName,
          'price': productPrice
        });
      }         
    }               
  }
  alert('Thêm ' + productName + ' thành công. Số lượng ' + quantity);
  // Lưu lại thông tin giỏ hàng vào localStorage.
  localStorage.setItem('cart', JSON.stringify(cart));
}