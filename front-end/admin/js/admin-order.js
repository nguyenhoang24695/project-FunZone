ORDER_API = "http://localhost:3000/_api/v1/order";

$(document).ready(function () {
  var page = Number(getUrlParameter('page'));
  var limit = Number(getUrlParameter('limit'));
  loadCustomerProduct(page, limit);
  $('.allProduct').click(loadCustomerProduct(page, limit));
  // $('body').on('click', '.delete-link', function(event){
  //    alert(JSON.stringify(event.target));
  //    return false;
  // });
});
// sản phẩm ở products, thông tin khách hàng ở contact
function loadCustomerProduct(page, limit) {
  $.ajax({
    url: ORDER_API + '?page=' + page + '&limit=' + limit,
    type: 'GET',
    success: function (response) {
      var listCustomerProduct = response.listCustomer;
      var totalPage = response.totalPage;
      var content = '';
      for (var i = 0; i < listCustomerProduct.length; i++) {
        var id = listCustomerProduct[i]._id;
        var status = listCustomerProduct[i].status;
        if (status == 0 || status == 2) {
          if (status == 2) {
            status = "Đang xác nhận";
            content += '<tr class="line">';
            content += '<td>' + listCustomerProduct[i].email + '</td>';
            content += '<td>' + listCustomerProduct[i].name + '</td>';
            content += '<td>' + listCustomerProduct[i].phone + '</td>';
            content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
            content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
            content += '<td>' + status + '</td>';
            content += '<td>' + '<a href="#" onclick="confirmProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-info">Xác nhận</a></td>';
            content += '<td>' + '<a href="#" onclick="deleteProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-danger">Xóa</a></td>';
            content += '</tr>';
          } else if (status == 0) {
            status = "Đã hủy";
            content += '<tr class="line">';
            content += '<td>' + listCustomerProduct[i].email + '</td>';
            content += '<td>' + listCustomerProduct[i].name + '</td>';
            content += '<td>' + listCustomerProduct[i].phone + '</td>';
            content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
            content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
            content += '<td>' + status + '</td>';
            content += '<td></td>';
            content += '</tr>';
          };
        } else if (status == 1) {
          status = "Đã xác nhận";
          content += '<tr class="line">';
          content += '<td>' + listCustomerProduct[i].email + '</td>';
          content += '<td>' + listCustomerProduct[i].name + '</td>';
          content += '<td>' + listCustomerProduct[i].phone + '</td>';
          content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
          content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
          content += '<td>' + status + '</td>';
          content += '<td>' + '</td>';
          content += '</tr>';
        }
        // if (status == 1) {
        //   status = "Đã xác nhận"
        // } else if (status == 0) {
        //   status = "Đã hủy"
        // }
        // else if (status == 2) {
        //   status = "Đang xác nhận"
        // }
        // content += '<tr class="line">';
        // content += '<td>' + listCustomerProduct[i].email + '</td>';
        // content += '<td>' + listCustomerProduct[i].name + '</td>';
        // content += '<td>' + listCustomerProduct[i].phone + '</td>';
        // content += '<td>' + listCustomerProduct[i]._id + '</td>';
        // content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
        // content += '<td>' + status + '</td>';
        // content += '<td>' + '<a href="#" onclick="deleteCustomer(\'' + id + '\')" class="btn btn-info">Xác nhận</a>';
        // content += '<td>' + '<a href="#" onclick="deleteCustomer(\'' + id + '\')" class="btn btn-danger">Xóa</a>';
        // content += '</td>';
        // content += '</tr>';

      }

      var paginateContent = '';
      if (page > 1) {
        paginateContent += '<li><a href="?page=1&limit=' + limit + '" aria-label="First"><span aria-hidden="true"><<</span></a></li>';
        paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '" aria-label="Previous"><span aria-hidden="true"><</span></a></li>';
      }
      if (page > 2) {
        paginateContent += '<li><a href="?page=' + (page - 2) + '&limit=' + limit + '">' + (page - 2) + '</a></li>';
      }
      if (page > 1) {
        paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '">' + (page - 1) + '</a></li>';
      }
      paginateContent += '<li class="active"><a href="?page=' + page + '">' + page + '</a></li>';
      if (totalPage > page) {
        paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '">' + (page + 1) + '</a></li>';
      }
      if ((totalPage - 1) > page) {
        paginateContent += '<li><a href="?page=' + (page + 2) + '&limit=' + limit + '">' + (page + 2) + '</a></li>';
      }
      if (page < totalPage) {
        paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '" aria-label="Next"><span aria-hidden="true">></span></a></li>';
        paginateContent += '<li><a href="?page=' + (totalPage) + '&limit=' + limit + '" aria-label="Last"><span aria-hidden="true">>></span></a></li>';
      }

      $('.pagination').html(paginateContent);
      $('#result').html(content);
    },
    error: function (response, message) {
      alert('Có lỗi xảy ra. ' + message);
    }
  });
}


function confirmProduct(id) {
  if (confirm('Xác nhận đơn hàng?')) {
    $.ajax({
      url: ORDER_API + '?id=' + id,
      type: 'PUT',
      success: function (response) {
        location.reload();
      },
      error: function (response, message) {
        alert('Có lỗi xảy ra. Không thay đổi được nội dung. ' + message);
      }
    });
  }
}

function orderDetail(id) {
  if (confirm('Xác nhận đơn hàng?')) {
    $.ajax({
      url: ORDER_API + '/d/' + id,
      type: 'GET',
      success: function (response) {
        location.reload();
      },
      error: function (response, message) {
        alert('Có lỗi xảy ra. Không thay đổi được nội dung. ' + message);
      }
    });
  }
}

function deleteProduct(id) {
  if (confirm('Có chắc muốn xóa sản phẩm này?')) {
    $.ajax({
      url: ORDER_API + '?id=' + id,
      type: 'DELETE',
      success: function (response) {
        alert('Xóa thành công.');
        location.reload();
      },
      error: function (response, message) {
        alert('Có lỗi xảy ra. Không xóa được nội dung. ' + message);
      }
    });
  }
}


$('.confirmed').click(function () {
  $.ajax({
    url: ORDER_API + '/' + '1',
    type: 'GET',
    success: function (response) {
      var listCustomerProduct = response;
      var content = '';
      console.log(listCustomerProduct);

      for (var i = 0; i < listCustomerProduct.length; i++) {
        status = "Đã xác nhận";
        content += '<tr class="line">';
        content += '<td>' + listCustomerProduct[i].email + '</td>';
        content += '<td>' + listCustomerProduct[i].name + '</td>';
        content += '<td>' + listCustomerProduct[i].phone + '</td>';
        content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
        content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
        content += '<td>' + status + '</td>';
        content += '<td></td>';
        content += '</tr>';
      }
      $('#result').html(content);
    },
    error: function (response, message) {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  });
});

$('.confirm').click(function () {
  $.ajax({
    url: ORDER_API + '/' + '2',
    type: 'GET',
    success: function (response) {
      var listCustomerProduct = response;
      var content = '';
      console.log(listCustomerProduct);

      for (var i = 0; i < listCustomerProduct.length; i++) {
        status = "Đang xác nhận";
        content += '<tr class="line">';
        content += '<td>' + listCustomerProduct[i].email + '</td>';
        content += '<td>' + listCustomerProduct[i].name + '</td>';
        content += '<td>' + listCustomerProduct[i].phone + '</td>';
        content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
        content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
        content += '<td>' + status + '</td>';
        content += '<td>' + '<a href="#" onclick="confirmProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-info">Xác nhận</a></td>';
        content += '<td>' + '<a href="#" onclick="deleteProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-danger">Xóa</a></td>';
        content += '</tr>';
      }
      $('#result').html(content);
    },
    error: function (response, message) {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  });
});
$('[data-filter="all"]').click(function () {
  location.reload();
});
$('.cancel').click(function () {
  $.ajax({
    url: ORDER_API + '/' + '0',
    type: 'GET',
    success: function (response) {
      var listCustomerProduct = response;
      var content = '';
      console.log(listCustomerProduct);

      for (var i = 0; i < listCustomerProduct.length; i++) {
        status = "Đã hủy";
        content += '<tr class="line">';
        content += '<td>' + listCustomerProduct[i].email + '</td>';
        content += '<td>' + listCustomerProduct[i].name + '</td>';
        content += '<td>' + listCustomerProduct[i].phone + '</td>';
        content += '<td>' + '<a href="admin-orderDetail.html?id='+ listCustomerProduct[i]._id +'"</a>'+ listCustomerProduct[i]._id +'</td>';
        content += '<td>' + listCustomerProduct[i].totalPrice + '</td>';
        content += '<td>' + status + '</td>';
        content += '<td></td>';
        content += '</tr>';
      }
      $('#result').html(content);
    },
    error: function (response, message) {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  });
});


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