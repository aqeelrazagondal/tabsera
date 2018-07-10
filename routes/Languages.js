var express = require('express');
var router = express.Router();
var Language=require('../models/Language');
 
router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
Language.getLanguageById(req.params.id,function(err,rows){
 
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
 
Language.getAllLanguages(function(err,rows){
 
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