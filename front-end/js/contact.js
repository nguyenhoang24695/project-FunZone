var contactAPI = "http://localhost:3000/_api/v1/cContact";
$(document).ready(function(){
    $('#submitBtn').click(function(){
        var name = $('[name="name"]').val();
		var address = $('[name="address"]').val();
		var phone = $('[name="phone"]').val();
		var email = $('[name="email"]').val();
		var title = $('[name="title"]').val();
        var content = $('[ name="content"]').val();
        // JSON
        var contact = {
            'ccName': name,
            'ccAddress' : address,
            'ccPhone' : phone,
            'ccEmail' : email,
            'ccTitle' : title,
            'ccSubject' : content
        }
        // Ajax
        $.ajax({
			url: contactAPI,
			type: "POST",
			data: contact,
			success: function(response){										
                alert("Bạn đã gửi thành công");
                console.log(response)
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});
    })
})
