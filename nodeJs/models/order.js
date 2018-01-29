var mongoose = require('mongoose');

module.exports = mongoose.model('orders', {	
	customerId: String,
	totalPrice: Number,
	phone: String,
	email: String,
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