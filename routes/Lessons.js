var express = require('express');
var router = express.Router();
var Lesson =require('../models/Lesson');

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
  //console.log(req.body);
    Lesson.alreadyExist(req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'Lesson name already Exist!'
            });
        }else{
          console.log("success");
          Lesson.addLesson(req.body,function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            res.json({
                success: true,
                message: 'Lesson Added Successfuly!'
              });//or return count for 1 &amp;amp;amp; 0
          }
          });
        }
        
      }
    });

});



router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
Lesson.getLessonById(req.params.id,function(err,rows){
 
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
 
Lesson.getAllLessons(function(err,rows){
 
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

router.get('/unit/:unitid',function(req,res,next){
// console.log(req);
//if(req.params.gradeid){
var unitid = req.params.unitid;

Lesson.getLessonByUnitId(unitid,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(rows);
  }
 
 });
//}
});

router.put('/:id',function(req,res,next){
  Lesson.updateLesson(req.params.id,req.body,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json({
        success: true,
        message: 'Lesson updated Successfuly'
      });
    }
  });
 });

router.get('/getExercises/:unitid',function(req,res,next){
// console.log(req);
//if(req.params.gradeid){
var unitid = req.params.unitid;

Lesson.getExerciseOfLessons(unitid,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(rows);
  }
 
 });
//}
});

 module.exports=router;