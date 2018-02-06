var mongoose = require('mongoose');
var Product = require('../models/product');
var Order = require('../models/order');
var OrderDetail = require('../models/orderDetail');
const Transaction = require('mongoose-transaction'); // phải chạy 
// lệnh npm install mongoose-transaction --save

exports.saveCart = function(req, resp){
	var listOrderProducts = JSON.parse(req.body.products);

	// Lấy productId từ trong cart truyền lên, tạo ra một mảng
	// các objectId.
	var ids = [];
	var mapProduct = {}; // Lưu map product để lấy số lượng sản phẩm về sau.
	for (var i = 0; i < listOrderProducts.length; i++) {
		mapProduct[listOrderProducts[i].pID] = listOrderProducts[i].quantity;
		var objectId = mongoose.Types.ObjectId(listOrderProducts[i].pID);		
		ids.push(objectId);
	}	

	// Tìm các sản phẩm nằm trong danh sách id truyền lên.
	Product.find({
	    'pID': { $in: ids}
	}, function(err, productResult){

		var orderDetailArray = [];
		var totalPrice = 0;

		// Tạo đối tượng order.
		var order = new Order({
			_id: mongoose.Types.ObjectId(),
			cName: req.body.contact.cName,
			cPhone: req.body.contact.cPhone,
			cEmail: req.body.contact.cEmail,
			totalPrice: 0,
			status: 2
		});

		// Tạo mảng order detail.
	    for (var i = 0; i < productResult.length; i++) {
	     	var orderDetail = new OrderDetail({
	     		orderId: order._id,	
	     		pId: productResult[i].pID,
	     		quantity: mapProduct[productResult[i].quantity],
	     		pPrice: productResult[i].pPrice
	     	});
	     	// Thêm từng đối tượng order detail vào mảng.
	     	orderDetailArray.push(orderDetail);
	     	// Tính toán tổng giá đơn hàng.
	     	totalPrice += orderDetail.quantity * orderDetail.pPrice;	     	
	    }
	    // Set tổng giá cho order.
	    order.totalPrice = totalPrice;
	    
	    // Tiến hành lưu vào database với transaction, đảm bảo tất cả đều thành công.
	    var transaction = new Transaction();
	    // Lưu order
	    transaction.insert('orders', order);
	    // Lưu danh sách order detail.
	    orderDetailArray.forEach(function(orderDetail){
	    	transaction.insert('orderDetail', orderDetail);
	    });
	    // Kết thúc transaction.
	    transaction.run(function(err, docs){
		    resp.send('OK');
		});    
	});
}

exports.getOrder = function(){}

exports.getOrderDetail = function(){}

exports.deleteOrder = function(){}