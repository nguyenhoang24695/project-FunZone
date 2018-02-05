var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('customers', {
	cId: Schema.Types.ObjectId,
	cName: {
		type: String,
		required: true
	},
	cPhone: {
		type: String,
		required: true,
		unique: true
	},
	cEmail: {
		type: String,
		required: true
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
		default: 0
	}
});