var db = require('../dbconnection'); //reference of dbconnection.js

var PaymentMethod = {

  getAllPaymentMethods:function(callback){

    return db.query("Select * from tbl_paymentmethods", callback);

  },
  getPaymentMethodById:function(id, callback){

    return db.query("select * from tbl_paymentmethods where paymentmethodid=?", [id], callback);

  }

};
module.exports = PaymentMethod;