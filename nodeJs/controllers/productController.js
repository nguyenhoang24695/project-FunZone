var Model = require('../models/product');
require('mongoose-pagination');

exports.getList = function(req, resp){
	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Model.find({'status': 1})
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'list': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}

exports.getDetail = function(req, resp){	
	Model.findOne({ _id: req.params.id, 'status': 1 },function(err, result){
		resp.send(result);
	});
}

exports.add = function(req, resp){		
	var obj = new Model(req.body);	
	obj.save(function(err){				
		resp.send(obj);
	});
}

exports.update = function(req, resp){
	Model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
		result.updatedAt = Date.now();
	    resp.json(result);
	});
}

exports.delete = function(req, resp){	
	Model.findById(req.params.id,function(err, result){				
		result.status = 0;
		Model.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    result.updatedAt = Date.now();
		    resp.json(result);
		});
	});	
}
exports.getAllList = function(req, resp){
	// Lấy tham số và parse ra number.	
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);

	Model.find()
	.paginate(page, limit, function(err, result, total) {    	
    	var responseData = {
    		'list': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
}