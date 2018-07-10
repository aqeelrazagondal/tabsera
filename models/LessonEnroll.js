var db=require('../dbconnection'); //reference of dbconnection.js
 
var LessonEnrollment={

	addLessonEnroll:function(LessonEnroll,callback){
	
	 return db.query("Insert into tbl_lessonenrollments (userid, lessonid, filepassword, fileurl) values(?,?,?,?)",[LessonEnroll.userid, LessonEnroll.lessonid,'dummy',LessonEnroll.fileurl],callback); 

	},

	getAllLessonEnrolls:function(callback){
 
		return db.query("Select * from tbl_lessonenrollments",callback);
	 
	},
	 getLessonEnrollByUserId:function(userid,callback){
	 
		return db.query("select * from tbl_lessonenrollments where userid=?",[userid],callback);
	 },

	getLessonEnrollByUserLessonId:function(userid, lessonid, callback){
	 
	 	
		return db.query("select * from tbl_lessonenrollments where userid=? AND lessonid=?",[userid, lessonid],callback);
	 },

	 updateLessonEnroll:function(userid, lessonid, Lesson, callback){
	 	
	 	return db.query("UPDATE tbl_lessonenrollments SET secondsviewed=?, iscompleted=b?, isdownloaded=b? WHERE userid=? AND lessonid=?",[Lesson.secondsviewed, Lesson.iscompleted, Lesson.isdownloaded, userid, lessonid],callback);
	 },

	 addSecondsOfLesson:function(userid, lessonid , secondsviewed, callback){
	 	
	 	return db.query("UPDATE tbl_lessonenrollments SET secondsviewed=? WHERE lessonid = ? AND userid = ? ",[secondsviewed , lessonid ,userid],callback);
	 },

	 lessonsEnrollCheck:function(userid, unitid , callback){
  console.log("Here " , userid , unitid);
	 	
	 	return db.query("SELECT tbl_lessonenrollments.lessonid FROM tbl_lessonenrollments , tbl_lessons  WHERE tbl_lessonenrollments.lessonid =  tbl_lessons .lessionid AND tbl_lessons.unitid = ? AND tbl_lessonenrollments.userid = ? ",[unitid , userid],callback);
	 }

	 
};

 module.exports=LessonEnrollment;