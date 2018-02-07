var order = require('../models/order');
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

exports.add = function(req, resp){
	var customer = new Customer(req.body);	
	customer.save(function(err){				
		if(err){
			// resp.send(err.message);
			resp.status(400)
			resp.send(err);
		}else{
			resp.send(customer);
		}
	});
}

exports.update = function(req, resp){
	Customer.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
	    result.updatedAt = Date.now();
	    resp.json(result);
	});
}

exports.delete = function(req, resp){
	// Customer.remove({
	//     _id: req.params.id
 	//    }, function(err, result) {
	//     resp.json({ message: 'Successfully deleted' });
	// });
	Customer.findById(req.params.id,function(err, result){				
		result.status = 0;
		Customer.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    result.updatedAt = Date.now();
		    resp.json(result);
		});
	});	
}