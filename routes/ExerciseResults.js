var express = require('express');
var router = express.Router();
var ExerciseResult =require('../models/ExerciseResult');

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


  ExerciseResult.addExerciseResult(req.body,function(err,count){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json({
        success: true,
        message: 'Exercise Result added Successfuly'
      });//or return count for 1 &amp;amp;amp; 0
    }

  });

});


router.get('/answeredStat/:userid?',function(req,res,next){
  let subjectSearchId = req.query.subjectid;

  ExerciseResult.totalAnswers(req.params.userid, subjectSearchId, function(err,rows){
    var FinalArray = [];
    if(err)
    {
      res.json(err);
    }
    else{
      var TrueCount = 0;
      var FalseCount = 0;
      for (var i = rows.length - 1; i >= 0; i--) {

        var subjectid = rows[i]['subjectid'];
        var unitid = rows[i]['unitid'];
        var lessionid = rows[i]['lessionid'];
        var questionid = rows[i]['questionid'];
        var exerciseid = rows[i]['exerciseid'];
        var bitResults = rows[i]['iscorrect'];
        var resUlt = bitResults.lastIndexOf(1) !== -1;

        if(resUlt == true){

          TrueCount++;
        }
        else {

          FalseCount++;
        }

        var obj = { 'SubjectID' : subjectid ,  'UnitID' : unitid , 'LessonID ' : lessionid , 'QuestionID ' : questionid , 'ExerciseID ' : exerciseid , 'Correct' : resUlt };
        FinalArray.push(obj);
      }
      // console.log("TRUE ARE _ =", count);
      console.log("FALSE ARE _ =", FinalArray);
      var totalQuestions = rows.length;
      var totalResult = { 'CorrectAnswers' : TrueCount ,  'WrongAnswers' : FalseCount , 'TotalQuestions' : totalQuestions };
      res.json({'Res': FinalArray , 'TotalResult' : totalResult});
    }

  });

});


module.exports=router;