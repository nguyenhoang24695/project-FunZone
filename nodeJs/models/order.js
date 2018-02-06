var mongoose = require('mongoose');

module.exports = mongoose.model('orders', {	
	cName: String,
	totalPrice: Number,
	cPhone: String,
	cEmail: String,
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