var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');

var Parent={
 
addParent:function(Parent,imagepath, callback){
	
	db.query('INSERT INTO tbl_users (mobileno, email, username, usertypeid, password, languageid, deviceid , image ) values(?,?,?,?,?,?,?,?)',[Parent.mobileno,Parent.email,Parent.username,Parent.usertypeid,md5(Parent.password),Parent.languageid,Parent.deviceid , imagepath] , function(err, result, fields) {
		if (err) {
	      // handle error
	      console.log(err);
	    }else{
	       // Your row is inserted you can view  
	      console.log(result.insertId);
	      var userid = result.insertId;
	     //var userid = 2;
	      return db.query("Insert into tbl_parents (userid, firstname, lastname, gender , dob, resellerid, cityid , image) values(?,?,?,?,?,?,?,?)",[userid, Parent.firstname,Parent.lastname,Parent.gender,Parent.dob,Parent.resellerid,Parent.cityid , imagepath],callback);
	  }
	});
 
 },

 alreadyExist:function(Parent, callback){
 	console.log('SELECT count(*) as cnt from tbl_users where username=?',[Parent.username]);
 	return db.query('SELECT count(*) as cnt from tbl_users where username=?',[Parent.username],callback);

 },

 list:function(callback){
 	return db.query("Select userid , firstname , lastname from tbl_parents",callback);
 },

 updateName:function(userid, Parent, callback){
 	return db.query('UPDATE tbl_parents SET firstname = ?, lastname=? where userid = ?',[Parent.firstname, Parent.lastname, userid],callback);
 },

 emailVerified:function(email, callback){
 	return db.query('UPDATE tbl_users SET isemailverified=? where email=?',[1, email], callback);
 },

 assignChild:function(ParentUserid, Student, callback){
 	return db.query('UPDATE tbl_students SET parentuserid = ? where userid = ?',[ParentUserid, Student.childID],callback);
 },

  getProfile:function(id , callback){
 	return db.query("select * from tbl_parents where userid=?",[id],callback);
 } , 

 addProfilePhoto:function(userid, imagepath, callback){

 	return db.query("UPDATE `tbl_parents` SET `image` = ?  WHERE userid=?", [imagepath, userid], callback);
 } 



};
 module.exports=Parent;