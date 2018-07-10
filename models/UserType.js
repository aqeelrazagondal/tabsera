var db=require('../dbconnection'); //reference of dbconnection.js
 
var UserType={
 
getAllUserTypes:function(callback){
 
return db.query("Select * from tbl_usertypes",callback);
 
},
 getUserTypeById:function(id,callback){
 
return db.query("select * from tbl_usertypes where usertypeid=?",[id],callback);
 },
 
};
 module.exports=UserType;