var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseTransactions = require('mongoose-transactions');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Kết nối đến mongodb ở project tạm
mongoose.connect('mongodb://localhost/project_fun_zone');
mongoose.Promise = global.Promise;

var applicationRoutes = require('./routes/applicationRoutes');

applicationRoutes(app);


app.listen(3000, function(){
	console.log('I am running at port 3000!');
});