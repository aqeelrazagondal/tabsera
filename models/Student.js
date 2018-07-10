var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');
 
var Student={
 
addUser:function(Student,imagepath, callback){

	
	db.query('INSERT INTO tbl_users (mobileno, email, username, usertypeid, password, languageid, deviceid , image) values(?,?,?,?,?,?,?,?)',[Student.mobileno,Student.email,Student.username,Student.usertypeid,md5(Student.password),Student.languageid,Student.deviceid , imagepath] , function(err, result, fields) {
		if (err) {
	      // handle error
	      console.log(err);
	    }
	    else{
	       // Your row is inserted you can view  
	      console.log(result.insertId);
	      var userid = result.insertId;
	     //var userid = 2;
	      return db.query("Insert into tbl_students (userid, firstname, lastname, dob, gender, schoolid, parentuserid, teacheruserid, resellerid, cityid , image) values(?,?,?,?,?,?,?,?,?,?,?)",[userid, Student.firstname,Student.lastname,Student.dob,Student.gender,Student.schoolid,Student.parentuserid,Student.teacheruserid,Student.resellerid,Student.cityid , imagepath],callback);
	  }
	});
 
 },

 alreadyExist:function(Student, callback){

 	return db.query('SELECT count(*) as cnt from tbl_users where username=?',[Student.username],callback);

 },

 updateName:function(userid, Student, callback){
 	return db.query('UPDATE tbl_students SET firstname = ?, lastname=? where userid = ?',[Student.firstname, Student.lastname, userid],callback);
 },

 emailVerified:function(email, callback){
 	return db.query('UPDATE tbl_users SET isemailverified=? where email=?',[1, email], callback);
 },

 getAllChilds:function(callback){
 
   return db.query("Select userid , firstname , lastname from tbl_students",callback);
 
},

assignParent:function(userid, Student, callback){
 	return db.query('UPDATE tbl_students SET parentuserid = ? where userid = ?',[Student.parentuserid, userid],callback);
 },

 checkparent:function(id, callback){
 	console.log(id);
 	  return db.query("Select * from tbl_parents where userid = ?" , [id],callback);
 } , 

 getProfile:function(id , callback){
 	return db.query("select * from tbl_students where userid=?",[id],callback);
 },

 addProfilePhoto:function(userid, imagepath, callback){

 	return db.query("UPDATE `tbl_students` SET `image` = ?  WHERE userid=?", [imagepath, userid], callback);
 } 

};
 module.exports=Student;