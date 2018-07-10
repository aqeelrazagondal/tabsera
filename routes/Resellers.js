var express = require('express');
var router = express.Router();
var Reseller=require('../models/Reseller');


router.post('/',function(req,res,next){
  //console.log(req.body);

  Reseller.addReseller(req.body,function(err,count){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json({
        success: true,
        message: 'Reseller Registered Successfuly!'
      });//or return count for 1 &amp;amp;amp; 0
    }
  });

});


router.get('/:id?',function(req,res,next){

  if(req.params.id){

    Reseller.getResellerById(req.params.id,function(err,rows){

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

    Reseller.getAllResellers(function(err,rows){

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


router.get('/adminuser/:adminid',function(req,res,next){
// console.log(req);
//if(req.params.gradeid){
  var adminid = req.params.adminid;

  Reseller.getResellerByAdminuserId(adminid,function(err,rows){

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

//change name
router.put('/editName/:id', function(req,res,next){

  Reseller.updateName(req.params.id, req.body, function(err, count){

    if(err){
      res.json(err);
    }
    else{
      res.json({
        success: true,
        message: 'Name updated Successfuly'
      });
    }
  });
});


//check if reseller has amount

router.post('/check',function(req,res,next){
  //console.log(req.body);
  Reseller.checkAmount(req.body, function(err, count){

    if(err){
      res.json(err);
    }
    else{
      console.log("rows ",count);
      console.log("test1 ", count[0]["cnt"]);

      // if(row>req.body.amount){
      if(count[0]["cnt"] > 0){
        res.json({
          success: true,
          message: 'Credit Exist!'
        });
      }
      else{
        res.json({
          success: false,
          message: 'Reseller has low Credit!'
        });
      }

    }
  });

});
/*
 Student.validStudent(req.body, function(err, count){

 if(err){
 res.json(err);
 }
 else{
 if(count[0]["cnt"] > 0){
 console.log("success");
 Student.updatePassword(req.body, function(err, count){

 if(err)
 {
 res.json(err);
 }
 else{
 res.json({
 success: true,
 message: 'Password updated Successfuly'
 });
 }
 });
 }
 else{
 res.json({
 success: false,
 message: 'Old Password doesnt match'
 });
 }
 }
 });
 */

module.exports=router;