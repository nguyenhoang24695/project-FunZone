var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CustomerContact', {
	ccName: {
		type: String,
		required: true
  },
  ccAddress: {
    type: String,
    required: true
  },
	ccPhone: {
		type: String,
		required: true
	},
	ccEmail: {
		type: String,
		required: true
  },
  ccTitle: {
    type: String,
    required: true
  },
  ccSubject: {
    type: String,
    required: true
  },
	status: {
    type: Number,
    default: 1
  }
});