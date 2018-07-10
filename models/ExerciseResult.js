var db=require('../dbconnection'); //reference of dbconnection.js
 
var ExerciseResult={
 
addExerciseResult:function(Exercise,callback){
 
 return db.query("Insert into tbl_exerciseresults (userid, exerciseid, questionid, iscorrect) values(?,?,?,?)",[Exercise.userid,Exercise.exerciseid,Exercise.questionid, Exercise.iscorrect],callback);

},

 getExerciseResult:function(userid, exerciseid, callback){

 	return db.query('SELECT * from tbl_exerciseresults where userid=? AND exerciseid=?',[userid, exerciseid],callback);

 }, 

  totalAnswers :function(userid, subjectSearchId , callback){
   
   if(subjectSearchId){

 	return db.query('SELECT   tbl_units.subjectid, tbl_lessons.unitid, tbl_exercises.lessionid, tbl_exerciseresults.questionid, tbl_exerciseresults.exerciseid, tbl_exerciseresults.iscorrect  FROM  tbl_units, tbl_exerciseresults, tbl_exercises, tbl_lessons WHERE userid= ? AND tbl_units.subjectid = ? AND tbl_exercises.exerciseid =  tbl_exerciseresults.exerciseid AND tbl_lessons.lessionid =  tbl_exercises.lessionid AND tbl_units.unitid = tbl_lessons.unitid ',[userid , subjectSearchId],callback);

   }
   else{

 	return db.query('SELECT  tbl_units.subjectid, tbl_lessons.unitid , tbl_exercises.lessionid , tbl_exerciseresults.questionid , tbl_exerciseresults.exerciseid, tbl_exerciseresults.iscorrect  FROM tbl_units,  tbl_exerciseresults , tbl_exercises , tbl_lessons WHERE userid= ? AND tbl_exercises.exerciseid =  tbl_exerciseresults.exerciseid AND tbl_lessons.lessionid =  tbl_exercises.lessionid AND tbl_units.unitid = tbl_lessons.unitid ',[userid],callback);
    
    }
 }
 
};
 module.exports=ExerciseResult;


//-----------------------------------------------------------------------------------------//
 //GET ANSWER RESULTS WITH SUBJECT , UNIT , LESSON , EXCERSISE IDS ==== HERE is Qeury 
 //SELECT  tbl_units.subjectid, tbl_lessons.unitid , tbl_exercises.lessionid , tbl_exerciseresults.exerciseid, tbl_exerciseresults.iscorrect  FROM tbl_units,  tbl_exerciseresults , tbl_exercises , tbl_lessons WHERE userid=2 AND tbl_exercises.exerciseid =  tbl_exerciseresults.exerciseid AND tbl_lessons.lessionid =  tbl_exercises.lessionid AND tbl_units.unitid = tbl_lessons.unitid 
//-----------------------------------------------------------------------------------------//


// SELECT distinct tbl_lessonenrollments.lessonid  , tbl_lessonenrollments.iscompleted AS LessonCompleted , tbl_exerciseenrollments.exerciseid ,  tbl_exerciseenrollments.iscompleted AS ExerciseCompleted FROM tbl_exerciseenrollments , tbl_lessonenrollments WHERE tbl_lessonenrollments.userid = 20 AND tbl_exerciseenrollments.userid = 20
//,  (SELECT distinct tbl_exerciseenrollments.iscompleted AS ExerciseCompleted FROM tbl_exerciseenrollments WHERE tbl_exerciseenrollments.userid = 20) as test1