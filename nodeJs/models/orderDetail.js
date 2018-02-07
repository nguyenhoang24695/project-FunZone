var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('orderDetail', {	
	orderId: Schema.Types.ObjectId,
	pId: String,
	quantity: Number,	
	unitPrice: Number
});