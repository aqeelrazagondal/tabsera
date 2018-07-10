var express = require('express');
var router = express.Router();
var Exercise=require('../models/Exercise');


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


router.get('/:id?',function(req,res,next){

  if(req.params.id){

    Exercise.getExerciseById(req.params.id,function(err,rows){

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

    Exercise.getAllExercises(function(err,rows){

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

//get exercise by lesson id
router.get('/lesson/:lessonid?',function(req,res,next){

  Exercise.getExerciseByLessonId(req.params.lessonid, function(err, rows){

    if(err){
      res.json(err);
    }
    else{
      res.json(rows);
    }
  })
});
module.exports=router;