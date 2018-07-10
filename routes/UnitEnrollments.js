var express = require('express');
var router = express.Router();
var UnitEnrollment =require('../models/UnitEnrollment');

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
   
    UnitEnrollment.getUnitEnrollmentByUserId(req.params.id,function(err,rows){
       
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
     
    UnitEnrollment.getAllUnitEnrollments(function(err,rows){
     
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

 router.post('/',function(req,res,next){
  //console.log(req.body);
          
          UnitEnrollment.addUnitEnrollment(req.body,function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            res.json({
                success: true,
                message: 'Unit Enrolled Successfuly!'
              });//or return count for 1 &amp;amp;amp; 0
          }
          });

});

 router.get('/userid/:userid/unitid/:unitid',function(req,res,next){

   
    UnitEnrollment.getUnitEnrollByUserUnitId(req.params.userid, req.params.unitid, function(err,rows){
       
      if(err)
        {
          res.json(err);
        }
        else{
          res.json(rows);
        }
    });

});


module.exports=router;