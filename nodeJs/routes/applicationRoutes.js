var customerController = require('../controllers/customerController');
// var adminController = require('../controllers/adminController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var ccController = require('../controllers/customer-contactController');
var orderController = require('../controllers/orderController');
module.exports = function (app) {
	// customer api.
	app.route('/_api/v1/customers')
		.get(customerController.getList)
		.post(customerController.add);

	app.route('/_api/v1/customers/:id')
		.get(customerController.getDetail)
		.put(customerController.update)
		.delete(customerController.delete);

	// admin api.
	// app.route('/_api/v1/admins')n
	// 	.get(adminController.getList)
	// 	.post(adminController.add);	

	// app.route('/_api/v1/admins/:id')
	// 	.get(adminController.getDetail)
	// 	.put(adminController.update)
	// 	.delete(adminController.delete);

	// order API
	app.route('/_api/v1/order')
		.get(orderController.getAllList)
		.put(orderController.update)
		.delete(orderController.delete);
	app.route('/_api/v1/order/:status')
		.get(orderController.getList);
		
	app.route('/_api/v1/order/d/:id')
		.get(orderController.getDetail)


	// admin customer contact api
	app.route('/_api/v1/cContact')
		.post(ccController.add)
		.get(ccController.getList);

	app.route('/_api/v1/cContact/:id')
		.get(ccController.getDetail)
		.delete(ccController.delete);

	// products api.
	app.route('/_api/v1/products')
		.get(productController.getList)
		.post(productController.add);

	// app.route('/_api/v1/products?category=:')
	// 	.get(productController.getListCategory);

	app.route('/_api/v1/products/:id')
		.get(productController.getDetail)
		.put(productController.update)
		.delete(productController.delete);

	// cart/order api
	app.route('/_api/v1/cart')
		.post(cartController.saveCart)
	// .get(cartController.getOrder);

	// app.route('/_api/v1/cart/:id')
	// 	.delete(cartController.deleteOrder)
	// 	.get(cartController.getOrderDetail);


	app.route('/_api/v1/adminProducts')
		.get(productController.getAllList);

	// image api.	
	app.post('/_api/v1/images', function (req, res) {
		console.log(req.files);
		if (!req.files)
			return res.status(400).send('No files were uploaded.');

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.myFile;

		// Use the mv() method to place the file somewhere on your server
		sampleFile.mv('./public/images/' + sampleFile.name, function (err) {
			if (err)
				return res.status(500).send(err);

			res.send('http://funzone-project.herokuapp.com/images/' + sampleFile.name);
		});
	});
}