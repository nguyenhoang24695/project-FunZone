var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('products', {
	pId: {
		type: String,
		unique: true
	},
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
	pPrice: {
		type: Number,
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