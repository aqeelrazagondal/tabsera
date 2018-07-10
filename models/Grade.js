var db=require('../dbconnection'); //reference of dbconnection.js
 
var Grade={
 
getAllGrades:function(callback){
 
return db.query("Select * from tbl_grades",callback);
 
},

 getGradeById:function(id,callback){
 
return db.query("select * from tbl_grades where gradeid=?",[id],callback);
 },

 addGrade:function(Grade,callback){
 return db.query("Insert into tbl_grades (name, description, imageurl, languageid) values(?,?,?,?)",[Grade.name,Grade.description,Grade.imageurl, Grade.languageid],callback);
 },

 alreadyExist:function(Grade, callback){

 	return db.query('SELECT count(*) as cnt from tbl_grades where name=?',[Grade.name],callback);

 },

 updateGrade:function(gradeid, Grade,callback){

 	return db.query("UPDATE tbl_grades SET name=?, description=?, imageurl=?, languageid=? where gradeid=?",[Grade.name,Grade.description,Grade.imageurl, Grade.languageid, gradeid],callback);

 	 },

};
 module.exports=Grade;