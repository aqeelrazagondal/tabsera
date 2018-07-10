var express = require('express');
var router = express.Router();
var ParntTransaction=require('../models/ParntTransaction');

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


//unit Purchase
router.post('/purchaseTrans',function(req,res,next){

    ParntTransaction.addParntPurchaseTrans(req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        res.json({
            success:true,
            message: 'Transaction done Successfuly'
        });
      }
    });

});



//Balance Purchase
router.post('/balanceTrans', function(req, res, next){

      ParntTransaction.addParntBalanceTrans(req.body, function(err, count){

        if(err){
            res.json(err);
        }
        else{
            res.json({
              success: true,
              message: 'Transaction done Successfuly'
            });
        }

      });
});

 module.exports=router;