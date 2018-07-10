var db=require('../dbconnection'); //reference of dbconnection.js
 
var ExerciseEnroll = {
 
 	addExerciseEnroll:function(Exercise,callback){
	
	 return db.query("Insert into tbl_exerciseenrollments (userid, exerciseid, filepassword, fileurl) values(?,?,?,?)",[Exercise.userid, Exercise.exerciseid,'dummy',Exercise.fileurl],callback);

	},
	getAllExerciseEnrolls:function(callback){
	 
	return db.query("Select * from tbl_exerciseenrollments",callback);
	 
	},
	 getExerciseEnrollByUserId:function(id,callback){
	 
	return db.query("select * from tbl_exerciseenrollments where userid =?",[id],callback);
	 },

	 getEnrollByUserExerciseId:function(userid, exerciseid, callback){

	 	return db.query("select * from tbl_exerciseenrollments where userid=? AND exerciseid=?",[userid, exerciseid], callback);
	 },

	 updateExerciseEnroll:function(userid, exerciseid, Exercise, callback){

	 	return db.query("UPDATE tbl_exerciseenrollments SET iscompleted=b?, isdownloaded=b? WHERE userid=? AND exerciseid=?",[Exercise.iscompleted, Exercise.isdownloaded, userid, exerciseid],callback);
	 },

	 daysSpentOnExcersise:function(userid, callback){

	 	return db.query("select * from tbl_exerciseenrollments where userid =?",[userid],callback);
	 },

	  exerciseEnrollCheck:function(userid, unitid , callback){
	 	return db.query("SELECT tbl_exercises.lessionid , tbl_exerciseenrollments.exerciseid FROM tbl_exerciseenrollments , tbl_exercises , tbl_lessons WHERE tbl_exerciseenrollments.exerciseid =  tbl_exercises.exerciseid  AND tbl_exercises.unitid = ? AND tbl_exerciseenrollments.userid = ? AND tbl_exercises.lessionid = tbl_lessons.lessionid ",[unitid , userid],callback);
	 }
 
};
 module.exports=ExerciseEnroll;

