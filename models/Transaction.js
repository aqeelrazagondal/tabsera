var db=require('../dbconnection'); //reference of dbconnection.js
 
var Transaction={
 
getAllUserTransactions:function(userid, callback){
 
	return db.query("Select * from tbl_transactions where userid=?",[userid],callback);
 
},
getTransactionById:function(tranid,callback){
 
	return db.query("select * from tbl_transactions where tranid=?",[tranid],callback);

}

};
 module.exports=Transaction;