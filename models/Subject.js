var db=require('../dbconnection'); //reference of dbconnection.js
 
var Subject={
 
getAllSubjects:function(callback){
 
return db.query("Select * from tbl_subjects where isenabled=1",callback);
 
},
 getSubjectById:function(id,callback){
 
return db.query("select * from tbl_subjects where isenabled=1 AND subjectid=?",[id],callback);
 },

 getSubjectByGradeId:function(gradeid,callback){
 
return db.query("select * from tbl_subjects where isenabled=1 AND gradeid=?",[gradeid],callback);
 },
 
 addSubject:function(Subject,callback){
 return db.query("Insert into tbl_subjects (gradeid, languageid, name, description, imageurl) values(?,?,?,?,?)",[Subject.gradeid,Subject.languageid,Subject.name, Subject.description,Subject.imageurl],callback);
 },

 alreadyExist:function(Subject, callback){

 	return db.query('SELECT count(*) as cnt from tbl_subjects where name=?',[Subject.name],callback);

 },

 updateSubject:function(subjectid, Subject,callback){

 	return db.query("UPDATE tbl_subjects SET gradeid=?, languageid=?, name=?, description=?, imageurl=?, isenabled=b? where subjectid=?",[Subject.gradeid,Subject.languageid,Subject.name, Subject.description, Subject.imageurl, Subject.isenabled, subjectid],callback);
 	 },

//FOR GETTING STATS OF A UNIT < WE NEED TO FETCH DATA FROM ITS LESSON & EXCERSISE
 

 getUnitEnrolledOfUser:function(userid, callback){

 	  return db.query("select unitid from tbl_unitenrollments where userid=? ",[userid],callback);
 	
 	 },

 getSubjectsOfUserEnrolled:function(userid, callback){

 	  return db.query("SELECT tbl_units.subjectid, tbl_subjects.name FROM tbl_units, tbl_unitenrollments, tbl_subjects WHERE tbl_units.unitid = tbl_unitenrollments.unitid AND tbl_unitenrollments.userid = ? AND tbl_subjects.subjectid = tbl_units.subjectid",[userid],callback);
 	
 	 }, 

 getSubjectProgress:function(userid, subjectid, callback){
  		console.log(typeof userid);
  		console.log(typeof subjectid);
 	  return db.query(`SELECT lessonid ,iscompleted FROM tbl_lessonenrollments WHERE lessonid IN (SELECT tbl_lessons.lessionid FROM tbl_lessons, tbl_units, tbl_unitenrollments WHERE tbl_units.subjectid = ? AND tbl_units.unitid = tbl_unitenrollments.unitid AND tbl_unitenrollments.userid = ? AND tbl_lessons.unitid = tbl_units.unitid)`,[subjectid , userid],callback);
 	
 	 }, 
 getUnitsOfLessons:function(lessonidsArray, callback){
 return db.query(`select unitid, lessionid from tbl_lessons where lessionid in (?)`, [lessonidsArray], callback); 	
 	 },

 getExcersiseIdsOfUser:function(excersiseidsArray, callback){
 return db.query(`select exerciseid, lessionid from tbl_exercises where exerciseid in (?)`, [excersiseidsArray], callback); 	
 	 },

 
 getExcersiseOfUsers:function(userid, subjectid, callback){
 return db.query(`SELECT exerciseid, iscompleted FROM tbl_exerciseenrollments WHERE exerciseid IN (SELECT tbl_exercises.exerciseid FROM tbl_exercises, tbl_units, tbl_unitenrollments WHERE tbl_units.subjectid =? AND tbl_exerciseenrollments.userid =?)`, [subjectid , userid], callback); 	
 	 },


 getLessonsStats:function(userid, subjectid , callback){
 if(subjectid){
     return db.query("SELECT tbl_units.subjectid, tbl_lessons.unitid, tbl_lessonenrollments.lessonid, tbl_lessonenrollments.iscompleted FROM tbl_lessonenrollments, tbl_lessons, tbl_units WHERE tbl_lessonenrollments.userid =? AND tbl_lessons.lessionid = tbl_lessonenrollments.lessonid AND tbl_units.unitid = tbl_lessons.unitid AND tbl_units.subjectid =?", [userid , subjectid], callback); 	
 	}
   else{
     return db.query("SELECT tbl_units.subjectid, tbl_lessons.unitid, tbl_lessonenrollments.lessonid, tbl_lessonenrollments.iscompleted FROM tbl_lessonenrollments, tbl_lessons, tbl_units WHERE tbl_lessonenrollments.userid =? AND tbl_lessons.lessionid = tbl_lessonenrollments.lessonid AND tbl_units.unitid = tbl_lessons.unitid", [userid], callback); 	
 	 }
 }, 

 getSubjectProgress:function(userid, subjectid , callback){
 if(subjectid){
    return db.query(`SELECT tbl_units.subjectid , tbl_exercises.unitid , tbl_lessonenrollments.lessonid  , tbl_lessonenrollments.iscompleted AS LessonCompleted  , tbl_exerciseenrollments.exerciseid , tbl_exerciseenrollments.iscompleted as ExerciseCompleted FROM tbl_lessonenrollments , tbl_exercises , tbl_exerciseenrollments ,tbl_units  WHERE tbl_lessonenrollments.userid = ? AND tbl_lessonenrollments.lessonid = tbl_exercises.lessionid AND tbl_exerciseenrollments.exerciseid = tbl_exercises.exerciseid AND tbl_lessonenrollments.userid = tbl_exerciseenrollments.userid AND tbl_units.unitid = tbl_exercises.unitid AND tbl_units.subjectid = ? `, [userid , subjectid], callback); 	
 	}
   else{
    
    return db.query(`SELECT tbl_units.subjectid , tbl_exercises.unitid , tbl_lessonenrollments.lessonid  , tbl_lessonenrollments.iscompleted AS LessonCompleted,tbl_exerciseenrollments.exerciseid , tbl_exerciseenrollments.iscompleted as ExerciseCompleted FROM tbl_lessonenrollments , tbl_exercises , tbl_exerciseenrollments ,tbl_units  WHERE tbl_lessonenrollments.userid = ? AND tbl_lessonenrollments.lessonid = tbl_exercises.lessionid AND tbl_exerciseenrollments.exerciseid = tbl_exercises.exerciseid AND tbl_lessonenrollments.userid = tbl_exerciseenrollments.userid AND tbl_units.unitid = tbl_exercises.unitid`, [userid], callback); 	
 	 
//  return db.query(`SELECT tbl_units.subjectid, tbl_exercises.unitid, tbl_lessonenrollments.lessonid, tbl_lessonenrollments.iscompleted AS LessonCompleted, tbl_exerciseenrollments.exerciseid, tbl_exerciseenrollments.iscompleted AS ExerciseCompleted
// FROM tbl_lessonenrollments, tbl_exercises, tbl_exerciseenrollments, tbl_units
// WHERE tbl_lessonenrollments.userid =20
// AND tbl_lessonenrollments.lessonid = tbl_exercises.lessionid
// AND tbl_exerciseenrollments.exerciseid = tbl_exercises.exerciseid
// AND tbl_lessonenrollments.userid = tbl_exerciseenrollments.userid
// AND tbl_units.unitid = tbl_exercises.unitid`, [userid], callback); 	

 	 }
 }

};
 module.exports=Subject;

//SELECT exerciseid, iscompleted FROM tbl_exerciseenrollments WHERE exerciseid IN (SELECT tbl_exercises.exerciseid FROM tbl_exercises, tbl_units, tbl_unitenrollments WHERE tbl_units.subjectid =3 AND tbl_exerciseenrollments.userid =20)
 // for getting lessonsid of user SELECT tbl_lessons.lessionid FROM tbl_lessons, tbl_units ,tbl_unitenrollments WHERE tbl_units.subjectid  =  3 and tbl_units.unitid =  tbl_unitenrollments.unitid and tbl_unitenrollments.userid=20 and tbl_lessons.unitid = tbl_units.unitid
 // SELECT tbl_lessons.lessionid , tbl_lessonenrollments.iscompleted FROM tbl_lessons, tbl_units ,tbl_unitenrollments ,tbl_lessonenrollments WHERE tbl_units.subjectid  =  3 and tbl_units.unitid =  tbl_unitenrollments.unitid and tbl_unitenrollments.userid=5 and tbl_lessons.unitid = tbl_units.unitid and tbl_lessonenrollments.lessonid = tbl_lessons.lessionid
 // SELECT iscompleted, lessonid
// FROM tbl_lessonenrollments
// WHERE lessonid
// IN (
// SELECT tbl_lessons.lessionid
// FROM tbl_lessons, tbl_units, tbl_unitenrollments
// WHERE tbl_units.subjectid =2
// AND tbl_units.unitid = tbl_unitenrollments.unitid
// AND tbl_unitenrollments.userid =5
// AND tbl_lessons.unitid = tbl_units.unitid
// )
