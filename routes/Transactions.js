var express = require('express');
var router = express.Router();
var Transaction =require('../models/Transaction');

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


router.get('/userid/:userid?',function(req,res,next){
 
Transaction.getAllUserTransactions(req.params.userid,function(err,rows){
 
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }

  });
 
});


router.get('/tranid/:tranid',function(req,res,next){
    // console.log(req);
    //if(req.params.gradeid){
    var tranid = req.params.tranid;

      Transaction.getTransactionById(tranid,function(err,rows){
       
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