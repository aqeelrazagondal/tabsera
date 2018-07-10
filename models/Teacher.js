var db=require('../dbconnection'); //reference of dbconnection.js

 
var Teacher={
 
getAllTeachers:function(callback){
 
return db.query("Select * from tbl_users",callback);
 
},
 getTeacherById:function(id,callback){
 
return db.query("select * from tbl_users where userid=?",[id],callback);
 },
 addTeacher:function(User,callback){
 	
 return db.query("Insert into tbl_users (mobileno,email,usertypeid,created_date,password,languageid) values(?,?,?,?,?,?)",[User.Userid,User.fullname,User.nativename,User.countryid],callback);
 },
 deleteUser:function(id,callback){
  return db.query("delete from tbl_users where userid=?",[id],callback);
 },
 updateUser:function(id,User,callback){
  return db.query("update tbl_users set fullname=?,nativename=?,countryid=? where userid=?",[User.fullname,User.nativename,User.countryid,id],callback);
 }
 
};
 module.exports=Teacher;
 