var ORDER_API = "http://localhost:3000/_api/v1/order";
$(document).ready(function () {
    var page = Number(getUrlParameter('page'));
    var limit = Number(getUrlParameter('limit'));
    var id = getUrlParameter('id');
    console.log(id)
    orderDetail(page, limit, id);
    $('#orderId').html(id)
    // $('.allProduct').click(orderDetail(page, limit));
    // $('body').on('click', '.delete-link', function(event){
    //    alert(JSON.stringify(event.target));
    //    return false;
    // });
});

function orderDetail(page, limit, id) {
    $.ajax({
        url: ORDER_API + '/d/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var listOrderProduct = response.listCustomer;
            var totalPage = response.totalPage;
            var content = '';
            for (var i = 0; i < listOrderProduct.length; i++) {
                var id = listOrderProduct[i].pId;
                var quantity = listOrderProduct[i].quantity;
                var unitPrice = listOrderProduct[i].unitPrice
                var orderId = listOrderProduct[i].orderId;
                content += '<tr class="line">';
                content += '<td>' + id + '</td>';
                content += '<td>' + quantity + '</td>';
                // content += '<td>' + listCustomerProduct[i].phone + '</td>';
                content += '<td>' + unitPrice + '</td>';
                // content += '<td>' + '<a href="#" onclick="confirmProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-info">Xác nhận</a></td>';
                // content += '<td>' + '<a href="#" onclick="deleteProduct(\'' + listCustomerProduct[i]._id + '\')" class="btn btn-danger">Xóa</a></td>';
                content += '</tr>';

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

            console.log(content);
            $('#result').html(content);
        },
        error: function (response, message) {
            alert('Có lỗi xảy ra. ' + message);
        }
    });
}
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