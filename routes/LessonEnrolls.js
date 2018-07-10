var express = require('express');
var router = express.Router();
var LessonEnroll =require('../models/LessonEnroll');


 router.get('/lessonsEnrollCheck/userid/:userid/unitid/:unitid',function(req,res,next){

   
    LessonEnroll.lessonsEnrollCheck(req.params.userid, req.params.unitid, function(err,rows){
       
      if(err)
        {
          res.json(err);
        }
        else{
          res.json(rows);
        }
    });

});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp 
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {     
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

 router.post('/',function(req,res,next){
          
       LessonEnroll.addLessonEnroll(req.body,function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            res.json({
                success: true,
                message: 'Lesson Enrolled Successfuly!'
              });//or return count for 1 &amp;amp;amp; 0
          }
        });

});


 router.get('/:id?',function(req,res,next){
 
  if(req.params.id){
   
    LessonEnroll.getLessonEnrollByUserId(req.params.id,function(err,rows){
       
      if(err)
        {
          res.json(err);
        }
        else{
          res.json(rows);
        }
    });
  }
  else{
     
    LessonEnroll.getAllLessonEnrolls(function(err,rows){
     
      if(err)
        {
          res.json(err);
        }
        else
        {
          res.json(rows);
        }
       
    });
   }
 });


router.get('/userid/:userid/lessonid/:lessonid',function(req,res,next){

   
    LessonEnroll.getLessonEnrollByUserLessonId(req.params.userid, req.params.lessonid, function(err,rows){
       
      if(err)
        {
          res.json(err);
        }
        else{
          res.json(rows);
        }
    });

});

router.put('/userid/:userid/lessonid/:lessonid',function(req,res,next){
 
  LessonEnroll.updateLessonEnroll(req.params.userid, req.params.lessonid, req.body,function(err,rows){
   
    if(err)
      {
        res.json(err);
      }
      else
      {
        //res.json(rows);
        res.json({
          success:true,
          message: 'lesson Enrolled updated Successfuly'
        })
      }
      });
 });


 router.put('/addSeconds',function(req,res,next){
  //console.log(req.body);
          
 LessonEnroll.addSecondsOfLesson(req.body.userid , req.body.lessonid, req.body.secondsviewed , function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            res.json({
                success: true,
                message: 'Time Added!'
              });//or return count for 1 &amp;amp;amp; 0
          }
        });

});



module.exports=router;


// LESSONS ENROLL CHECK 
// SELECT tbl_lessonenrollments.lessonid FROM tbl_lessonenrollments , tbl_lessons  WHERE tbl_lessonenrollments.lessonid =  tbl_lessons .lessionid AND tbl_lessons.unitid = 3 AND tbl_lessonenrollments.userid = 20