var PRODUCT_API = "http://localhost:3000/_api/v1/products";
var FILE_UPLOAD_URL = "http://localhost:3000/_api/v1/images";
$(document).ready(function(){
	var isValidProductName=false;
	var isValidProductId=true;
	var isValidProductPrice=false;
	var isValidProductDescription=false;

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

	// function checkIsValidProductId(){
	// 	var pId = $('[name="pId"]').val();
	// 	var pCategory = $('[name="pCategory"]:checked').val();
	// 	var pCategoryId = pId.charAt(0);
	// 	if(pId != undefined && pId != null && pId.length == 4 && (pCategoryId == "G" || pCategoryId == "R" || pCategoryId == "H")){
	// 		$("[name='pId']").next().addClass("text-success").removeClass("text-danger");
	// 		$("[name='pId']").next().text("Mã sản phẩm hợp lệ.");
	// 		isValidProductId=true;
	// 		if(pCategoryId == 'H'){
	// 			$("#pCategory01").prop("checked", true);
	// 			$('#pTypeBlock').css("display", "none");
	// 		} else if(pCategoryId == 'G'){
	// 				$("#pCategory02").prop("checked", true);
	// 				$('#pTypeBlock').css("display", "block");
	// 			} else {
	// 				$("#pCategory03").prop("checked", true);
	// 				$('#pTypeBlock').css("display", "block");
	// 			}
	// 		jQuery("#admin-add-product-form input[id^=pCategory]:radio").attr('disabled',true);
	// 	}else{
	// 		isValidProductId=false;
	// 		$("[name='pId']").next().addClass("text-danger").removeClass("text-success");
	// 		$("[name='pId']").next().text("Mã sản phẩm phải bằng 4 kí tự và bắt đầu bằng R, G hoặc H.");
	// 	}
	// }

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

	if(getUrlParameter('id') != null || getUrlParameter('id') != undefined){
		getInfo(getUrlParameter('id'));
	}
	
	// Lấy thông tin sản phẩm ra
	function getInfo(id){
		$.ajax({
			url: PRODUCT_API +"/"+ id,
			type:"GET",
			success:function(response){
				console.log(response);
				$("[name='pName']").val(response.pName);
				$("[name='pId']").val(response.pId);
				$("[name='pId']").attr('disabled',true);
				$("[name='pPrice']").val(response.pPrice);
				$("[name='pDescription']").val(response.pDescription);
				// radio button value in ra hơi khó
				$('[name="pCategory"]:checked').val(response.pCategory);
				// $("[name='pCategory']").attr('checked', response.pCategory);
				$("[name='pType']").attr('checked', response.pType);
				$("[name='status']").attr('checked', response.status);
				$("[name='pImage']").val(response.pImage);
				// pCategory = response.pCategory;
				// pType = response.pType;
				// status = response.status;
				// pImage = response.pImage;
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. Không nhận được dữ liệu sản phẩm này. ' + message);
			}
		});
	}

	// Thêm sản phẩm mới
	function addProduct(){

	var pName = $('[name="pName"]').val();
	var pId = $('[name="pId"]').val();
	var pPrice = $('[name="pPrice"]').val();
	var pDescription = $('[name="pDescription"]').val();
	var pCategory = $('[name="pCategory"]:checked').val();
	var pType = $('[name="pType"]:checked').val();
	var status = $('[name="status"]:checked').val();
	var pImage = $('[name="avatarUrl"]').val();
	// checkIsValidProductId();
	checkIsValidProductName();
	checkIsValidProductDescription();
	checkIsValidProductPrice();
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
		console.log(isValidProductName,isValidProductId,isValidProductPrice,isValidProductDescription)
		if(isValidProductName && isValidProductId && isValidProductPrice 
			&& isValidProductDescription){
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
			// checkIsValidProductId();
			checkIsValidProductPrice();
			checkIsValidProductDescription();
		}
	};

	// Update thông tin sản phẩm có sẵn
	function updateProduct(id){

		var pName = $('[name="pName"]').val();
		var pId = $('[name="pId"]').val();
		var pPrice = $('[name="pPrice"]').val();
		var pDescription = $('[name="pDescription"]').val();
		var pCategory = $('[name="pCategory"]:checked').val();
		var pType = $('[name="pType"]:checked').val();
		var status = $('[name="status"]:checked').val();
		var pImage = $('[name="avatarUrl"]').val();
		// checkIsValidProductId();
		checkIsValidProductName();
		checkIsValidProductDescription();
		checkIsValidProductPrice();

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
			&& isValidProductDescription){
			$.ajax({
				url: api_url,
				type: method,
				data: product,
				success: function(response){										
					$('#modal-success').modal();
					$('#admin-add-product-form').trigger("reset");
					$(".form-group span").text("");
					window.location.href = 'admin-list-product.html';
				},
				error: function(response, message){
					alert('Có lỗi xảy ra. Không cập nhật được sản phẩm. ' + message);
				}
			});
		} else {
			checkIsValidProductName();
			// checkIsValidProductId();
			checkIsValidProductPrice();
			checkIsValidProductDescription();
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
	};
	$("#pImage").change(function (e){						
		var data = new FormData();
		data.append('myFile', e.target.files[0]);
		$.ajax({
			url: FILE_UPLOAD_URL,
			type: "POST",
			data: data,
			cache: false,
		    contentType: false,
		    processData: false,
			success: function(response){
				console.log(response)										
				$('#preview').attr('src', response);
				$('[name="avatarUrl"]').val(response);
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});
	});
});

// Lấy file ảnh ra cho vào preview
// function readURL(input) {
// 	if (input.files && input.files[0]) {
// 	  var reader = new FileReader();
// 	  reader.onload = function (e) {
// 		$('#preview')
// 		  .attr('src', e.target.result)
// 		  .width(150);
// 	  };
// 	  reader.readAsDataURL(input.files[0]);
// 	}
//   }

// Lấy tham số truyền lên trong url theo tên.
function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};