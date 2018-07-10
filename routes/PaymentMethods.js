var express = require('express');
var router = express.Router();
var PaymentMethod=require('../models/PaymentMethod');

router.get('/:id?',function(req,res,next){

  if(req.params.id){

    PaymentMethod.getPaymentMethodById(req.params.id,function(err,rows){

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

    PaymentMethod.getAllPaymentMethods(function(err,rows){

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

module.exports=router;