var mongoose = require('mongoose');

module.exports = mongoose.model('products', {
	pId: Schema.Types.ObjectId,
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
		default: 1
	}
});