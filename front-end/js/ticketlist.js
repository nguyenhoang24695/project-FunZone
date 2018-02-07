var TICKET_API = "http://localhost:3000/_api/v1/products";

$(document).ready(function(){
	loadticketList();
});

function loadticketList (){
	$.ajax({
      url: TICKET_API,
      type: 'GET',
      success: function(response){
        var ticket = response.list;
        console.log(ticket);
        var htmlContent = '';
        for (var i = 0; i < ticket.length; i++) {
          htmlContent += '<div class="col-md-4">';
          htmlContent += '<a href="ticket.html?id=' + ticket[i]._id + '">';
          htmlContent += '<div class="booking-bar-content">';
          htmlContent += '<div class="product-image">'
          htmlContent += '<img src="' + ticket[i].pImage + '">';
          htmlContent += '</div>';
          htmlContent += '<div class="product-header prduct"><h3>' + ticket[i].pName + '</h3></div> ';
          htmlContent += '<div class="product-info">';
          htmlContent += '<i class="fa fa-book" aria-hidden="true"></i>' + ticket[i].pDescription;
          htmlContent += '</div>';
          htmlContent += '<div class="space"></div>';
          htmlContent += '<div class="price"><h5 class="pull-left">Giá từ</h5>';
          htmlContent += '<div class="pull-right product-pricing"><h4>VND </h4>';
          htmlContent += '<h2 class="text-primary">' + ticket[i].pPrice + '</h2>';
          htmlContent += '</div></div><div class="clearfix"></div></div>';
          htmlContent += '</div>';
          htmlContent += '</a>';
          htmlContent += '</div>';
        }
        $('#result').html(htmlContent);
      },
      error: function(error, message){
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    });
};