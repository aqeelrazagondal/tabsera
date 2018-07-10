var db=require('../dbconnection'); //reference of dbconnection.js

var ParntTransaction = {

	addParntBalanceTrans:function(Parent, callback){

 	db.query('INSERT INTO tbl_transactions (reversedtranid, trantypeid, transtatusid, paymentmethodid, description, userid, debit)   values (?,?,?,?,?,?,?)',[Parent.reversedtranid, Parent.trantypeid, Parent.transtatusid, Parent.paymentmethodid, Parent.description, Parent.userid, Parent.amount], function(err, result, fields) {

 		if(err){
 			console.log(err);
 		}
 		else{

 			console.log(result.insertId);
 			return db.query('UPDATE tbl_parents SET credit = credit + ? where userid= ? ',[Parent.amount, Parent.userid], callback);
 		}
 	});
 },

 addParntPurchaseTrans:function(Parent, callback){

 	db.query('INSERT INTO tbl_transactions (reversedtranid, trantypeid, transtatusid, paymentmethodid, description, userid, credit)   values (?,?,?,?,?,?,?)',[Parent.reversedtranid, Parent.trantypeid, Parent.transtatusid, Parent.paymentmethodid, Parent.description, Parent.userid, Parent.amount], function(err, result, fields) {

 		if(err){
 			console.log(err);
 		}
 		else{

 			console.log(result.insertId);
 			return db.query('UPDATE tbl_parents SET credit = credit - ? where userid= ? ',[Parent.amount, Parent.userid], callback);
 		}
 	});
 }


};
 module.exports=ParntTransaction;
