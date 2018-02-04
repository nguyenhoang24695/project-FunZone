var ccController = require('../controllers/customer-contactController');

module.exports = function (app) {
  // customer api.
  app.route('/_api/v1/cContact')
    .post(ccController.add);
  app.route('/_api/v1/cContact')
    .get(ccController.getList);
  // admin api
  

  app.route('/_api/v1/cContact/:id')
    .get(ccController.getDetail)
    .delete(ccController.delete);

};