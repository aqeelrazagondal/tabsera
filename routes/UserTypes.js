var express = require('express');
var router = express.Router();
var UserType=require('../models/UserType');
 
router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
UserType.getUserTypeById(req.params.id,function(err,rows){
 
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
 
UserType.getAllUserTypes(function(err,rows){
 
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