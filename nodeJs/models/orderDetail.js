var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('orderDetail', {	
	orderId: Schema.Types.ObjectId,
	pId: Schema.Types.ObjectId,
	quantity: Number,	
	unitPrice: Number
});