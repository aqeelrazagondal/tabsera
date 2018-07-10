var db=require('../dbconnection'); //reference of dbconnection.js
 
var TranStatus = {
 
getAllTranStatus:function(callback){
 
return db.query("Select * from tbl_transtatus",callback);
 
},
 getTranStatusById:function(id,callback){
 
return db.query("select * from tbl_transtatus where transtatusid  =?",[id],callback);
 }
 
};
 module.exports=TranStatus;