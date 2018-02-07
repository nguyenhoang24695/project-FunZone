var mongoose = require('mongoose');

module.exports = mongoose.model('orders', {	
	name: {
		type: String,
		require: [true,'Chưa nhập tên']
	},
	totalPrice: Number,
	phone: {
		type: String,
		require: [true,'Chưa nhập phone']
	},
	email: {
		type: String,
		require: [true,'Chưa nhập email']
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