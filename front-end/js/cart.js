function loadCart(){
	var cart = localStorage.getItem('cart');
	// Kiểm tra sự tồn tại của giỏ hàng.			
	if (cart == null){
		alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
		$(location).attr('href', './index.html');
	}
	// Parse thông tin giỏ hàng.
	cart = JSON.parse(cart);
	// Kiểm tra thông tin sản phẩm trong giỏ hàng.
	if(cart.products == undefined || cart.products == null){
		alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
		$(location).attr('href', './index.html');
	}

	var cartContent = '';
	var totalPrice = 0;
	// Đến đây, đảm bảo giỏ hàng tồn tại và có sản phẩm.
	for (var i = 0; i < cart.products.length; i++) {
		cartContent += '<ul>';
			cartContent += '<li class="longpro pID" style="display:none;">' + cart.products[i].pId + '</li>';
			cartContent += '<li class="longpro pName">' + cart.products[i].pName + '</li>';
			cartContent += '<li class="shortpro product-quantity">' + cart.products[i].quantity + '</li>';
			cartContent += '<span class="add-to-card plus"><button>+</button></span>';
			cartContent += '<span class="add-to-card minus"><button>-</button></span>';
			cartContent += '<li class="shortpro pPrice">' + cart.products[i].pPrice + '</li>';
			var totalItemPrice = cart.products[i].quantity * cart.products[i].pPrice;
			cartContent += '<li class="shortpro">' + totalItemPrice + '</li> ';
		cartContent += '</ul>';
		totalPrice += totalItemPrice;
	}
	cartContent += '<hr>';
	cartContent += '<ul>';
		cartContent += '<li class="totalpro">Tổng tiền</li>';
		cartContent += '<li class="shortpro">' + totalPrice + '</li>';
	cartContent += '</ul>';
	$('#cart').html(cartContent);
}

function addToCart(pId, pName, pPrice, quantity){
	var cart = localStorage.getItem('cart');	
	if (cart == null){
		// Nếu chưa thì tạo mới giỏ hàng với products là danh sách các sản phẩm
		// kèm số lượng.
		if(quantity > 0){
			cart = {
				'products': [
					{
						'pId': pId,
						'pName': pName,
						'pPrice': pPrice,
						'quantity': quantity
					}
				]
			}	
		}						
	} else{
		// Nếu đã tồn tại sản phẩm.
		// Parse thông tin giỏ hàng về json object.
		cart = JSON.parse(cart);
		// Kiểm tra sự tồn tại của trường products trong giỏ hàng.
		if(cart.products != undefined && cart.products != null){
			// Kiểm tra sự tồn tại của sản phầm trong giỏ hàng.
			var existsItem = false;
			for (var i = 0; i < cart.products.length; i++) {
				// Nếu tồn tại sản phẩm.
				if(cart.products[i].pId == pId){
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
					'pId': pId,
					'pName': pName,
					'pPrice': pPrice,
					'quantity': quantity
				});
			}					
		}								
	}
	alert('Thêm sản phẩm ' + pName + ' vào giỏ hàng thành công. Số lượng ' + quantity);
	// Lưu lại thông tin giỏ hàng vào localStorage.
	localStorage.setItem('cart', JSON.stringify(cart));
}

function submitCart(){
	var cart = localStorage.getItem('cart');
	cart = JSON.parse(cart);
	
	var arrayProducts = [];
	for (var i = 0; i < cart.products.length; i++) {
		var product = {
			'pID': cart.products[i].pID,
			'quantity':	cart.products[i].quantity,
			'pPrice': cart.products[i].pPrice				
		};
		arrayProducts.push(product);
	}

	
	var cName = $('[name="cName"]').val();
	var cPhone = $('[name="cPhone"]').val();
	var cEmail = $('[name="cEmail"]').val();
    var contact = {
        'cName': cName,
        'cPhone' : cPhone,
        'cEmail' : cEmail
    }

	var data = {
		'products': JSON.stringify(arrayProducts),
		'contact': contact
	}	
	var api_url = "http://localhost:3000/_api/v1/cart";
	var method = 'POST';

	$.ajax({
		url: api_url,
		type: method,
		data: data,
		success: function(response){										
			alert("Success");
			localStorage.removeItem('cart');
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});		
}