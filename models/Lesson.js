var db=require('../dbconnection'); //reference of dbconnection.js
 
var Lesson={
 
getAllLessons:function(callback){
 
return db.query("Select * from tbl_lessons where isenabled=1",callback);
 
},
 getLessonById:function(id,callback){
 
return db.query("select * from tbl_lessons where isenabled=1 AND lessionid=?",[id],callback);
 },

 getLessonByUnitId:function(unitid,callback){
 
return db.query("select * from tbl_lessons where isenabled=1 AND unitid=?",[unitid],callback);
 },
 
 addLesson:function(Unit,callback){
 return db.query("Insert into tbl_lessons (lessionid, unitid, description, lessonminutes, lessonurl, isenabled) values(?,?,?,?,?,?)",[Unit.lessionid,Unit.unitid,Unit.description, Unit.lessonminutes,Unit.lessonurl, 1],callback);
 },

 alreadyExist:function(Unit, callback){

 	return db.query('SELECT count(*) as cnt from tbl_units where name=?',[Unit.name],callback);

 },

 updateLesson:function(lessionid, Lesson,callback){

 	return db.query("UPDATE tbl_lessons SET unitid=?, description=?, lessonminutes=?, lessonurl=?, isenabled=b? where lessionid=?",[Lesson.unitid,Lesson.description,Lesson.lessonminutes, Lesson.lessonurl, Lesson.isenabled, lessionid ],callback);
 
 	 },

  getExerciseOfLessons:function(unitid,callback){

 	 return db.query("SELECT tbl_lessons.lessionid, tbl_lessons.unitid, tbl_lessons.description, tbl_lessons.lessonminutes, tbl_lessons.lessonurl, tbl_exercises.exerciseid, tbl_exercises.lessionid, tbl_exercises.description, tbl_exercises.exerciseminutes, tbl_exercises.exerciseurl FROM tbl_exercises, tbl_lessons WHERE tbl_lessons.isenabled =1 AND tbl_lessons.unitid = ? AND tbl_lessons.lessionid = tbl_exercises.lessionid",[unitid ],callback);
 
 	 },
 
};
 module.exports=Lesson;