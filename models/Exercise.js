var db=require('../dbconnection'); //reference of dbconnection.js
 
var Exercise = {
 
getAllExercises:function(callback){
 
return db.query("Select * from tbl_exercises where isenabled=1",callback);
 
},
 getExerciseById:function(id,callback){
 
return db.query("select * from tbl_exercises where isenabled=1 AND exerciseid =?",[id],callback);
 },

 getExerciseByLessonId:function(lessonid, callback){

 	return db.query("select * from tbl_exercises where isenabled=1 AND lessionid=?",[lessonid], callback);
 }
 
};
 module.exports=Exercise;