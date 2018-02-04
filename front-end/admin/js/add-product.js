var ADD_PRODUCT_API = "http://localhost:3000/_api/v1/products";

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

$('#btn-submit').click(function(){
	var pName = $('[name="pName"]').val();
	var pPrice = $('[name="pPrice"]').val();
	var pDescription = $('[name="pDescription"]').val();
	var pCategory = $('[name="pCategory"]:checked').val();
	var pType = $('[name="pType"]:checked').val();
	var status = $('[name="status"]:checked').val();
	var pImage = $('#pImage').val();

	var product = {
		'pName': pName,
		'pPrice': pPrice,
		'pDescription': pDescription,
		'pCategory': pCategory,
		'pType': pType,
		'pImage': pImage,
		'status': status
	}
	var api_url = ADD_PRODUCT_API;
		var method = 'POST';		
		$.ajax({
			url: api_url,
			type: method,
			data: product,
			success: function(response){										
				$('#modal-success').modal();
				$('[name=admin-add-product-form]').trigger("reset");
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});
});