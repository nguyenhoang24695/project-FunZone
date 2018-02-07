var order = require('../models/order');
var orderDetail = require('../models/orderDetail');
require('mongoose-pagination');

exports.getAllList = function(req, resp){
	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	order.find()
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'listCustomer': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}

exports.getList = function(req, resp){	
	order.find({status: req.params.status},function(err, result){
		resp.send(result);
	});
}

exports.getDetail = function(req, resp){
	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	orderDetail.find({orderId: req.params.id})
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'listCustomer': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}


exports.update = function(req, resp){	
	order.findById(req.query.id,function(err, result){				
		result.status = 1;
		console.log(result)
		order.findOneAndUpdate({_id: req.query.id}, result, {new: true}, function(err, result) {
			console.log(result);
		    result.updatedAt = Date.now();
		    resp.json(result);
		});
	});	
}
exports.delete = function(req, resp){	
	order.findById(req.query.id,function(err, result){		
		result.status = 0;
		order.findOneAndUpdate({_id: req.query.id}, result, {new: true}, function(err, result) {
		    result.updatedAt = Date.now();
		    resp.json(result);
		});
	});	
}