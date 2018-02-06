var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseTransactions = require('mongoose-transactions');
var cors = require('cors');
var app = express();
const fileUpload = require('express-fileupload');
// Kết nối đến mongodb ở project tạm
mongoose.connect('mongodb://nguyenhoang95:liuyifei1A@ds123658.mlab.com:23658/fun_zone_project');
mongoose.Promise = global.Promise;


app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));



var applicationRoutes = require('./routes/applicationRoutes');
applicationRoutes(app);
app.listen(3000, function(){
	console.log('I am running at port 3000!');
});