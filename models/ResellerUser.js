var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');
 
var Reseller={
 
addResellerUser:function(Reseller,callback){

	
	db.query('INSERT INTO tbl_users (mobileno, email, usertypeid, password, languageid, deviceid) values(?,?,?,?,?,?)',[Reseller.mobileno,Reseller.email,Reseller.usertypeid,md5(Reseller.password),Reseller.languageid,Reseller.deviceid] , function(err, result, fields) {
		if (err) {
	      // handle error
	      console.log(err);
	    }else{
	       // Your row is inserted you can view  
	      console.log(result.insertId);
	      var userid = result.insertId;
	     //var userid = 2;
	      return db.query("Insert into tbl_resellerusers (resellerid, userid, firstname, lastname, gender) values(?,?,?,?,?)",[Reseller.resellerid, userid, Reseller.firstname,Reseller.lastname,Reseller.gender],callback);
	
	    }
	});
 
 },

 alreadyExist:function(Reseller, callback){

 	return db.query('SELECT count(*) as cnt from tbl_users where mobileno=?',[Reseller.mobileno],callback);

 },
 
getAllResellerUsers:function(callback){
 
	return db.query("Select * from tbl_resellerusers",callback);
 
},
 getUserByResellerId:function(resellerid,callback){
 
	return db.query("select * from tbl_resellerusers where resellerid =?",[resellerid],callback);
 },

 getResellerByUserId:function(userid, callback){

 	return db.query("select * from tbl_resellerusers where userid=?",[userid], callback);
 }

};
 module.exports=Reseller;