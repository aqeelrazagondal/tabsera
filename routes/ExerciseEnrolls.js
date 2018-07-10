var express = require('express');
var router = express.Router();
var ExerciseEnroll =require('../models/ExerciseEnroll');

router.get('/exerciseEnrollCheck/userid/:userid/unitid/:unitid',function(req,res,next){

  ExerciseEnroll.exerciseEnrollCheck(req.params.userid, req.params.unitid, function(err,rows){

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
  //console.log(req.body);

  ExerciseEnroll.addExerciseEnroll(req.body,function(err,count){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json({
        success: true,
        message: 'Exercise Enrolled Successfuly!'
      });//or return count for 1 &amp;amp;amp; 0
    }
  });

});


router.get('/:id?',function(req,res,next){

  if(req.params.id){

    ExerciseEnroll.getExerciseEnrollByUserId(req.params.id,function(err,rows){

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

    ExerciseEnroll.getAllExerciseEnrolls(function(err,rows){

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


router.get('/userid/:userid/exerciseid/:exerciseid',function(req,res,next){


  ExerciseEnroll.getEnrollByUserExerciseId(req.params.userid, req.params.exerciseid, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });

});

router.put('/userid/:userid/exerciseid/:exerciseid',function(req,res,next){

  ExerciseEnroll.updateExerciseEnroll(req.params.userid, req.params.exerciseid, req.body,function(err,rows){

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

router.get('/daysSpentOnExcersice/:userid',function(req,res,next){

  ExerciseEnroll.daysSpentOnExcersise(req.params.userid ,function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else
    {
      for (var i = rows.length - 1; i >= 0; i--) {
        // var date = rows[i]['enrolldate'];
        //  console.log(date);
      }
      var date = rows[0]['enrolldate'];
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var SavedDate = new Date(date);
      var TodayDate = new Date();
      var diffDays = Math.round(Math.abs((SavedDate.getTime() - TodayDate.getTime())/(oneDay)));
      console.log(diffDays);
      res.json({"No of Days Spent " : diffDays});


    }
  });
});

module.exports=router;