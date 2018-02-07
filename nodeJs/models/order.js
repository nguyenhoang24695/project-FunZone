var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('orders', {
	
	name: {
		type: String,
		require: [true,'Chưa nhập tên'],
		min:3
	},
	totalPrice: Number,
	phone: {
		type: String,
		require: [true,'Chưa nhập phone'],
		min: 3
	},
	email: {
		type: String,
		require: [true,'Chưa nhập email'],
		min: 3
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});