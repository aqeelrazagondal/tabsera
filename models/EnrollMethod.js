var db=require('../dbconnection'); //reference of dbconnection.js
 
var EnrollMethod = {
 
getAllEnrollMethods:function(callback){
 
return db.query("Select * from tbl_enrollmethods",callback);
 
},
 getEnrollMethodById:function(id,callback){
 
return db.query("select * from tbl_enrollmethods where enrollmethodid=?",[id],callback);
 }
 
};
 module.exports=EnrollMethod;