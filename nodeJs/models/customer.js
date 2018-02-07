var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('customers', {
	cId: Schema.Types.ObjectId,
	cName: {
		type: String,
		required: [true,'Name bị thiếu']
	},
	cPhone: {
		type: String,
		required: [true,'Phone bị thiếu'],
		unique: true
	},
	cEmail: {
		type: String,
		required: [true,'Email bị thiếu']
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