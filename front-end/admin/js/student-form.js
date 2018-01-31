var STUDENT_API_URL = "http://localhost:3000/_api/v1/students";
var FILE_UPLOAD_URL = "http://localhost:3000/_api/v1/images";
// Chờ dom load hết.
$(document).ready(function(){	
	// Bắt sự kiện click vào nút btn-submit
	$('[name="btn-submit"]').click(function(){				
		var rollNumber = $('[name="rollNumber"]').val();
		var firstName = $('[name="firstName"]').val();
		var lastName = $('[name="lastName"]').val();
		var gender = $('[name="gender"]').val();
		var birthday = $('[name="birthday"]').val();
		var avatarUrl = $('[name="avatarUrl"]').val();

		var student = {
			'rollNumber': rollNumber,
			'firstName': firstName,					
			'lastName': lastName,
			'gender': gender,
			'birthday': birthday,
			'avatarUrl': avatarUrl
		};
		var api_url = STUDENT_API_URL;
		var method = 'POST';		
		$.ajax({
			url: api_url,
			type: method,
			data: student,
			success: function(response){										
				$('#modal-success').modal();
				$('[name=student-form]').trigger("reset");
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});

	});

	$("#fileUpload").change(function (e){						
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
				$('#preview').attr('src', response);
				$('[name="avatarUrl"]').val(response);
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});
	});
});
