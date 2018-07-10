var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');
 
var StdEWallet={
 



 addStdBalanceTrans:function(Student, callback){

 	db.query('INSERT INTO tbl_transactions (reversedtranid, trantypeid, transtatusid, paymentmethodid, description, userid, debit)   values (?,?,?,?,?,?,?)',[Student.reversedtranid, Student.trantypeid, Student.transtatusid, Student.paymentmethodid, Student.description, Student.userid, Student.amount], function(err, result, fields) {

 		if(err){
 			console.log(err);
 		}
 		else{
 			console.log(result.insertId);
 			return db.query('UPDATE tbl_students SET credit = credit + ? where userid= ? ',[Student.amount, Student.userid], callback);
 			//return db.query('UPDATE tbl_resellers SET credit = credit - ? where resellerid = ? ',[Student.amount, Student.resellerid], callback);
 			
 		}
 	});
 },

 updateReseller:function(Student, callback){
 	
 	return db.query('UPDATE tbl_resellers SET credit = credit - ? where resellerid = ? ',[Student.amount, Student.resellerid], callback);
 			
 }

};
 module.exports=StdEWallet;