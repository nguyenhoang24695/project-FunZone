var mongoose = require('mongoose');
var Product = require('../models/product');
var Order = require('../models/order');
var OrderDetail = require('../models/orderDetail');
const Transaction = require('mongoose-transaction')(mongoose); // phải chạy 
// lệnh npm install mongoose-transaction --save
var Schema = mongoose.Schema;

exports.saveCart = function (req, resp) {
	var listOrderProducts = JSON.parse(req.body.products);
	var contactInfo = JSON.parse(req.body.contact)
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
		'_id': { $in: ids }
	}, function (err, productResult) {
		if (err) {
			resp.send(err);
			console.log(err);
		} else {
			var orderDetailArray = [];
			var totalPrice = 0;
			// Tạo đối tượng order.
			var order = new Order({
				_id: mongoose.Types.ObjectId(),
				phone: contactInfo.cPhone,
				name: contactInfo.cName,
				email: contactInfo.cEmail,
				totalPrice: 0,
				status: 2
			});
			// Tạo mảng order detail.
			console.log('-----------------------------------------------------------------');
			for (var i = 0; i < productResult.length; i++) {
				var orderDetail = new OrderDetail({
					orderId: order._id,
					pId: productResult[i]._id,
					quantity: mapProduct[listOrderProducts[i].pID],
					unitPrice: productResult[i].pPrice
				});
				// Thêm từng đối tượng order detail vào mảng.
				orderDetailArray.push(orderDetail);
				// Tính toán tổng giá đơn hàng.
				totalPrice += orderDetail.quantity * orderDetail.unitPrice;
				
				console.log('Tong gia: ' + totalPrice)
				console.log('don gia gia: ' + orderDetail.unitPrice)
				console.log('So luong gia: ' + orderDetail.quantity)
			}
			
			// Set tổng giá cho order.
			order.totalPrice = totalPrice;

			// Tiến hành lưu vào database với transaction, đảm bảo tất cả đều thành công.
			var transaction = new Transaction();
			// Lưu order
			
			// Lưu danh sách order detail.
			// orderDetailArray.forEach(function (orderDetail) {
			// 	transaction.insert('orderDetail', orderDetail);
			// });
			for(var i = 0;i<orderDetailArray.length;i++){
				transaction.insert('orderDetail', orderDetailArray[i])
			}
			transaction.insert('orders', order);
			console.log(orderDetail);
			console.log(order);
			console.log('-----------------------------------------------------------------');
			// Kết thúc transaction.
			
			transaction.run(function (err, docs) {
				if (err) {
					resp.status(400).send(err)
				} else {
					resp.status(200).send(docs)				
				}
			});
		}

	});
}
