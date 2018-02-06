var PRODUCT_API = "http://localhost:3000/_api/v1/products";

$(document).ready(function(){
	var isValidProductName=false;
	var isValidProductId=false;
	var isValidProductPrice=false;
	var isValidProductDescription=false;
	var isValidProductImage=false;

	function checkIsValidProductName(){
		var pName = $('[name="pName"]').val();
		if(pName == undefined || pName == null || pName.length == 0 || pName.length > 25 || pName.length < 7){
			isValidProductName=false;
			$("[name='pName']").next().addClass("text-danger").removeClass("text-success");
			$("[name='pName']").next().text("Tên sản phẩm phải lớn hơn 7 kí tự và nhỏ hơn 25 kí tự.");
		}else{
			$("[name='pName']").next().addClass("text-success").removeClass("text-danger");
			$("[name='pName']").next().text("Tên sản phẩm hợp lệ.");
			isValidProductName=true;
		}
	}

	function checkIsValidProductId(){
		var pId = $('[name="pId"]').val();
		var pCategory = $('[name="pCategory"]:checked').val();
		var pCategoryId = pId.charAt(0);
		if(pId != undefined && pId != null && pId.length == 4 && (pCategoryId == "G" || pCategoryId == "R" || pCategoryId == "H")){
			$("[name='pId']").next().addClass("text-success").removeClass("text-danger");
			$("[name='pId']").next().text("Mã sản phẩm hợp lệ.");
			isValidProductId=true;
			if(pCategoryId == 'H'){
				$("#pCategory01").prop("checked", true);
				$('#pTypeBlock').css("display", "none");
			} else if(pCategoryId == 'G'){
					$("#pCategory02").prop("checked", true);
					$('#pTypeBlock').css("display", "block");
				} else {
					$("#pCategory03").prop("checked", true);
					$('#pTypeBlock').css("display", "block");
				}
			jQuery("#admin-add-product-form input[id^=pCategory]:radio").attr('disabled',true);
		}else{
			isValidProductId=false;
			$("[name='pId']").next().addClass("text-danger").removeClass("text-success");
			$("[name='pId']").next().text("Mã sản phẩm phải bằng 4 kí tự và bắt đầu bằng R, G hoặc H.");
		}
	}

	function checkIsValidProductPrice(){
		var pPrice = $('[name="pPrice"]').val();
		if(pPrice == undefined || pPrice == null || pPrice.length == 0){		
			isValidProductPrice=false;
			$("[name='pPrice']").next().addClass("text-danger").removeClass("text-success");
			$("[name='pPrice']").next().text("Vui lòng nhập giá sản phẩm.");
		}else{
			$("[name='pPrice']").next().addClass("text-success").removeClass("text-danger");
			$("[name='pPrice']").next().text("Giá sản phẩm hợp lệ.");
			isValidProductPrice=true;
		}
	}

	function checkIsValidProductDescription(){
		var pDescription = $('[name="pDescription"]').val();
		if(pDescription == undefined || pDescription == null || pDescription.length==0){		
			isValidProductDescription=false;
			$("[name='pDescription']").next().addClass("text-danger").removeClass("text-success");
			$("[name='pDescription']").next().text("Vui lòng mô tả sản phẩm.");
		}else{
			$("[name='pDescription']").next().addClass("text-success").removeClass("text-danger");
			$("[name='pDescription']").next().text("Mô tả sản phẩm hợp lệ.");
			isValidProductDescription=true;
		}
	}

	function checkIsValidProductImage(){
		var pImage = $('#pImage').val();
		if(!pImage){		
			isValidProductImage=false;
			$("#pImage").next().addClass("text-danger").removeClass("text-success");
			$("#pImage").next().text("Vui lòng tải ảnh sản phẩm.");
		}else{
			$("#pImage").next().addClass("text-success").removeClass("text-danger");
			$("#pImage").next().text("Ảnh sản phẩm hợp lệ.");
			isValidProductImage=true;
		}
	}

	// Lấy file ảnh ra cho vào preview
	function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function (e) {
	      $('#preview')
	        .attr('src', e.target.result)
	        .width(150);
	    };
	    reader.readAsDataURL(input.files[0]);
	  }
	}

	var pName = $('[name="pName"]').val();
	var pId = $('[name="pId"]').val();
	var pPrice = $('[name="pPrice"]').val();
	var pDescription = $('[name="pDescription"]').val();
	var pCategory = $('[name="pCategory"]:checked').val();
	var pType = $('[name="pType"]:checked').val();
	var status = $('[name="status"]:checked').val();
	var pImage = $('#pImage').val();

	// Kiểm tra validate sản phẩm
	$("[name='pName']").keydown(function(event){
		var pName = $('[name="pName"]').val();
		if(event.keyCode==9){
			checkIsValidProductName();
		}
	});

	$("[name='pId']").keydown(function(event){
		var pId = $('[name="pId"]').val();
		var pCategory = $('[name="pCategory"]:checked').val();
		if(event.keyCode==9){
			checkIsValidProductId();
		}
	});

	$("[name='pPrice']").keydown(function(event){
		var pPrice = $('[name="pPrice"]').val();
		if(event.keyCode==9){
			checkIsValidProductPrice();
		}	
	});

	$("[name='pDescription']").keydown(function(event){
		var pDescription = $('[name="pDescription"]').val();
		if(event.keyCode==9){
			checkIsValidProductDescription();
		}
	});

	$("#pImage").mouseup(function(event){
		var pImage = $('#pImage').val();
		checkIsValidProductImage();
	});

	// Lấy thông tin sản phẩm ra
	function getInfo(id){
		$.ajax({
			url: PRODUCT_API +"/"+ id,
			type:"GET",
			success:function(response){
				pName = response.pName;
				pId = response.pId;
				$("[name='pId']").attr('disabled',true);
				pPrice = response.pPrice;
				pDescription = response.pDescription;
				// radio button value in ra hơi khó
				pCategory = response.pCategory;
				pType = response.pType;
				status = response.status;
				pImage = response.pImage;
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. Không nhận được dữ liệu sản phẩm này. ' + message);
			}
		});
	}

	// Thêm sản phẩm mới
	function addProduct(){
		var product = {
			'pName': pName,
			'pId': pId,
			'pPrice': pPrice,
			'pDescription': pDescription,
			'pCategory': pCategory,
			'pType': pType,
			'pImage': pImage,
			'status': status
		}

		var api_url = PRODUCT_API;
		var method = 'POST';
		if(isValidProductName && isValidProductId && isValidProductPrice 
			&& isValidProductDescription && isValidProductImage){
			$.ajax({
				url: api_url,
				type: method,
				data: product,
				success: function(response){										
					$('#modal-success').modal();
					$('#admin-add-product-form').trigger("reset");
					$(".form-group span").text("");
				},
				error: function(response, message){
					alert('Có lỗi xảy ra. Không thêm được sản phẩm. ' + message);
				}
			});
		} else {
			checkIsValidProductName();
			checkIsValidProductId();
			checkIsValidProductPrice();
			checkIsValidProductDescription();
			checkIsValidProductImage();
		}
	};

	// Update thông tin sản phẩm có sẵn
	function updateProduct(id){
		var product = {
			'pName': pName,
			'pId': pId,
			'pPrice': pPrice,
			'pDescription': pDescription,
			'pCategory': pCategory,
			'pType': pType,
			'pImage': pImage,
			'status': status
		}

		var api_url = PRODUCT_API + "/" + id;
		var method = "PUT";
		if(isValidProductName && isValidProductId && isValidProductPrice 
			&& isValidProductDescription && isValidProductImage){
			$.ajax({
				url: api_url,
				type: method,
				data: product,
				success: function(response){										
					$('#modal-success').modal();
					$('#admin-add-product-form').trigger("reset");
					$(".form-group span").text("");
				},
				error: function(response, message){
					alert('Có lỗi xảy ra. Không cập nhật được sản phẩm. ' + message);
				}
			});
		} else {
			checkIsValidProductName();
			checkIsValidProductId();
			checkIsValidProductPrice();
			checkIsValidProductDescription();
			checkIsValidProductImage();
		}
	};

	$('#btn-submit').click(function(){
		if(getParameterByName("id") != null){
			getInfo(getParameterByName("id"));
			updateProduct(getParameterByName("id"));
		} else{
			addProduct();
		}
	});

	function getParameterByName(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
});