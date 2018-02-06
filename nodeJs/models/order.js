var mongoose = require('mongoose');

module.exports = mongoose.model('orders', {	
	customerName: String,
	totalPrice: Number,
	customerphone: String,
	customeremail: String,
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