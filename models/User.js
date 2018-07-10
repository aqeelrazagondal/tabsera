var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');
 
var User={
 

 findUser:function(User,callback){
 
return db.query("select userid from tbl_users where mobileno=? AND password=?",[User.mobileno, md5(User.password)],callback);
 },

 updateUserLoggedIn:function(userid, token, User, callback){
 	return db.query("UPDATE tbl_users SET isloggedin=?, lastlogindate=?, lastloginip=? , sessiontoken=? WHERE userid=?",[1, new Date(), User.lastloginip, token, userid],callback);
 },

updatePassword:function(userid, Register, callback){
	return db.query('UPDATE tbl_users SET password = ? where userid = ?',[md5(Register.password), userid],callback);
},

updateMobileno:function(userid, Register, callback){
	return db.query('UPDATE tbl_users SET mobileno = ? where userid = ?',[Register.mobileno, userid],callback);
},

alreadyExist:function(userid, Register, callback){

 	return db.query('SELECT count(*) as cnt from tbl_users where mobileno=?',[Register.mobileno],callback);

},

logoutUser:function(userid, callback){
	return db.query('UPDATE tbl_users SET isloggedin=?, sessiontoken=? where userid=? ',[0,  , userid], callback);
},

addSession:function(userid, token, User, callback){
	//console.log('Insert into tbl_sessions (sessionid, userid, deviceid, loginip, isactive) values(?,?,?,?,?)',[token,userid,User.deviceid,User.loginip,1]);
	return db.query('Insert into tbl_sessions (sessionid, userid, deviceid, loginip, isactive) values(?,?,?,?,?)',[token,userid,User.deviceid,User.loginip,1], callback);

},

getProfile:function(id , callback){
 	return db.query("select * from tbl_users where userid=?",[id],callback);
 }  

};
 module.exports=User;
 