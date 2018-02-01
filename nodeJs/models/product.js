var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('products', {
	pId: String,
	pName: {
		type: String,
		required: true
	},
	pDescription: {
		type: String,
		required: true
	},
	pImage: {
		type: String,
		required: true
	},
	pCategory: {
		type: String,
		required: true
	},
	pType: Boolean, //true với người lớn, false với trẻ em
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