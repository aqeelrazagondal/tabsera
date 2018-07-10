var db=require('../dbconnection'); //reference of dbconnection.js
 
var Language={
 
getAllLanguages:function(callback){
 
return db.query("Select * from tbl_languages",callback);
 
},
 getLanguageById:function(id,callback){
 
return db.query("select * from tbl_languages where languageid=?",[id],callback);
 },
 
};
 module.exports=Language;