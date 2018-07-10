var express = require('express');
var router = express.Router();
var Subject=require('../models/Subject');


router.post('/',function(req,res,next){
  //console.log(req.body);
    Subject.alreadyExist(req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'Subject name already Exist!'
            });
        }else{
          console.log("success");
          Subject.addSubject(req.body,function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            res.json({
                success: true,
                message: 'Subject Added Successfuly!'
              });//or return count for 1 &amp;amp;amp; 0
          }
          });
        }
        
      }
    });

});
 
router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
Subject.getSubjectById(req.params.id,function(err,rows){
 
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
 
Subject.getAllSubjects(function(err,rows){
 
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

router.get('/grade/:gradeid',function(req,res,next){
// console.log(req);
//if(req.params.gradeid){
var gradeid = req.params.gradeid;
//var gradeid = req.params.gradeid;
//console.log("gradeid " +gradeid);
Subject.getSubjectByGradeId(gradeid,function(err,rows){
 
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
  Subject.updateSubject(req.params.id,req.body,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json({
        success: true,
        message: 'Subject updated Successfuly'
      });
    }
  });
 });

router.get('/usersubjects/:id',function(req,res,next){
  Subject.getSubjectsOfUserEnrolled(req.params.id,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(rows);
    }
  });
 }); 
     
//GET STATS

router.post('/getStats',function(req,res,next){

//////////////
//////////let paramter = req.query.subjectid;
    var unitsInSubject = [];
    var lessonidsArray = [];
    var excersiseidsArray = [];
    Subject.getSubjectProgress(req.body.userid, req.body.subjectid, function(err, rows){
       
          if(err)
          {
            res.json(err);
          }
          else
          {
          
          var complete = 0;
          var uncomplete = 0;
          var lessonid = 0;
          var excersiseIDResult =[];
          for (var i = rows.length - 1; i >= 0; i--) {

              var lessonid = rows[i]['lessonid'];
              var completed = rows[i]['iscompleted'];
              lessonidsArray.push(lessonid);
              var resUlt = completed.lastIndexOf(1) !== -1;
              var Obj = {'LessonId' : lessonid , 'LessonCompleted' : resUlt};
              unitsInSubject.push(Obj);
               if(resUlt == true){
                 
                  complete++;
                }
               else {
                  
                   uncomplete++;
                }

          }
            //Array of excersises of lessons & complete / No complete ratio
      Subject.getExcersiseOfUsers(req.body.userid, req.body.subjectid, function(err, rows){
               if(err)
              {
                res.json(err);
              }
              else
              {

                  excersiseIDResult = rows;
                 var complete = 0;
                  var uncomplete = 0;
                  var lessonid = 0;
                
                  for (var i = rows.length - 1; i >= 0; i--) {

                      var excersiseId = rows[i]['exerciseid'];
                      var completed = rows[i]['iscompleted'];
                      var lessonidd = rows[i]['LessonId'];
                      excersiseidsArray.push(excersiseId);
                      var resUlt = completed.lastIndexOf(1) !== -1;
                      var Obj = {'ExerciseId' : excersiseId , 'ExerciseCompleted' : resUlt , 'LessonId' : lessonidd };
                      excersiseIDResult.push(Obj);

                  }
                                        //Array of lessonsId 
                 Subject.getUnitsOfLessons(lessonidsArray, function(err, rows){

                  if(err)
                  {
                  return 
                  res.json(err);
                  }

                  for (var i = rows.length - 1; i >= 0; i--) {
                        unitsInSubject.forEach(function(el) {
                      if (el.lessonId === rows[i].LessonId ) { 
                        el.unitId = rows[i].unitid;
                      }
                    });
                  }

              //GET EXCERCISES OF FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                      Subject.getExcersiseIdsOfUser(excersiseidsArray, function(err, rows){

                             if(err)
                              {
                                res.json(err);
                              }
                              else
                              {
                                  for (var i = rows.length - 1; i >= 0; i--) {
                                    excersiseIDResult.forEach(function(el) {
                                      if (el.exerciseid === rows[i].exerciseid ) {
                                        el.LessonId = rows[i].lessionid;
                                        }
                                      });
                               }          

                                res.json({
                                  respons: unitsInSubject,
                                  exc : excersiseIDResult
                                });                      
                              }

                          });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

                      });

                    }
              });

            console.log("Complete are = " , complete);
            console.log("UnComplete are = " , uncomplete);
            console.log("Total are = " , unitsInSubject.length);
          }
    });
   
 });


///////////////GET LEssons completed / Uncompleted Countof user 
//QUERY IS //
// SELECT tbl_units.subjectid, tbl_lessons.unitid, tbl_lessonenrollments.lessonid, tbl_lessonenrollments.iscompleted
// FROM tbl_lessonenrollments, tbl_lessons, tbl_units
// WHERE tbl_lessonenrollments.userid =20
// AND tbl_lessons.lessionid = tbl_lessonenrollments.lessonid
// AND tbl_units.unitid = tbl_lessons.unitid


router.get('/lessonsStats/:id',function(req,res,next){
let subjectSearchId = req.query.subjectid;
Subject.getLessonsStats(req.params.id,subjectSearchId,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    { 

         var complete = 0;
          var uncomplete = 0;
          var lessonid = 0;
          var lessonsResult =[];
          for (var i = rows.length - 1; i >= 0; i--) {

              var subjectid = rows[i]['subjectid'];
              var unitid = rows[i]['unitid'];
              var lessonid = rows[i]['lessonid'];
              var completed = rows[i]['iscompleted'];
              var resUlt = completed.lastIndexOf(1) !== -1;
              var Obj = {'SubjectID' : subjectid , 'UnitID' : unitid , 'LessonId' : lessonid , 'LessonCompleted' : resUlt};
              lessonsResult.push(Obj);
               if(resUlt == true){
                 
                  complete++;
                }
               else {
                  
                   uncomplete++;
                }

          }


      res.json({'Result' : lessonsResult , 'TotalResult' : {'Complted': complete , 'UnComplete': uncomplete}});
    }
  });
 }); 



router.get('/SubjectProgressStats/:id',function(req,res,next){
let subjectSearchId = req.query.subjectid;
Subject.getSubjectProgress(req.params.id,subjectSearchId,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    { 

          var LessonComplete = 0;
          var LessonUncomplete = 0;
          var ExerciseComplete = 0;
          var ExerciseUncomplete = 0;
          var lessonid = 0;
          var overallResult =[];
          for (var i = rows.length - 1; i >= 0; i--) {

              var subjectid = rows[i]['subjectid'];
              var unitid = rows[i]['unitid'];
              var lessonid = rows[i]['lessonid'];
              var LessonCompleted = rows[i]['LessonCompleted'];
              var LessonCompletedResUlt = LessonCompleted.lastIndexOf(1) !== -1;
              var exerciseid = rows[i]['exerciseid'];
              var ExerciseCompleted = rows[i]['ExerciseCompleted'];
              var ExerciseCompletedResUlt = ExerciseCompleted.lastIndexOf(1) !== -1;
              var Obj = {'SubjectID' : subjectid , 'UnitID' : unitid , 'LessonId' : lessonid , 'LessonCompleted' : LessonCompletedResUlt ,  'ExerciseID' : exerciseid , 'ExerciseCompleted' : ExerciseCompletedResUlt };
              overallResult.push(Obj);
               if(LessonCompletedResUlt == true){
                 
                  LessonComplete++;
                }
               else {
                  
                  LessonUncomplete++;
                }
                if(ExerciseCompletedResUlt == true){
                 
                  ExerciseComplete++;
                }
               else {
                  
                   ExerciseUncomplete++;
                }

               var Total = overallResult.length;
               var LessonsPercentage = Math.floor((LessonComplete / Total) * 100);
               var ExersisePercentage = Math.floor((ExerciseComplete / Total) * 100);

          }


      res.json({'Result' : overallResult , 'LessonsTotalResult' : {'Complted': LessonComplete , 'UnComplete': LessonUncomplete , 'Completion Percentage ' : LessonsPercentage} , 'ExerciseTotalResult' : {'Complted': ExerciseComplete , 'UnComplete': ExerciseUncomplete  , 'Completion Percentage ' : ExersisePercentage}});
    }
  });
 }); 

 module.exports=router;
