var db=require('../dbconnection'); //reference of dbconnection.js
 
var TranType = {
 
getAllTranTypes:function(callback){
 
return db.query("Select * from tbl_trantypes",callback);
 
},
 getTranTypeById:function(id,callback){
 
return db.query("select * from tbl_trantypes where trantypeid=?",[id],callback);
 }
 
};
 module.exports=TranType;