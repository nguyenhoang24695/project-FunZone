var cContact = require('../models/customer-contact');
require('mongoose-pagination');

exports.getList = function (req, resp) {
  // Lấy tham số và parse ra number.	
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  cContact.find({ 'status': 1 })
    .paginate(page, limit, function (err, result, total) {
      var responseData = {
        'listCustomer': result,
        'totalPage': Math.ceil(total / limit)
      };
      resp.send(responseData);
    });
}
exports.add = function (req, resp) {
  var CContact = new cContact(req.body);
  CContact.save(function (err) {
    if(err){
      console.log("err")
      resp.send('error')
    }else{
      resp.send(CContact);
    }
  });
}
exports.getDetail = function (req, resp) {
  cContact.findOne({ _id: req.params.id, 'status': 1 }, function (err, result) {
    resp.send(result);
  });
}
exports.delete = function (req, resp) {
  // Customer.remove({
  //     _id: req.params.id
  //    }, function(err, result) {
  //     resp.json({ message: 'Successfully deleted' });
  // });
  cContact.findById(req.params.id, function (err, result) {
    result.status = 0;
    cContact.findOneAndUpdate({ _id: req.params.id }, result, { new: true }, function (err, result) {
      result.updatedAt = Date.now();
      resp.json(result);
    });
  });
}