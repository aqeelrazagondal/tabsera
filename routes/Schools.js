var express = require('express');
 var router = express.Router();
 var School =require('../models/School');
 
router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
School.getSchoolById(req.params.id,function(err,rows){
 
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
 
School.getAllSchools(function(err,rows){
 
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

router.get('/city/:cityid',function(req,res,next){

var cityid = req.params.cityid;

School.getSchoolByCityId(cityid,function(err,rows){
 
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

router.post('/addSchool',function(req,res,next){
//console.log(req.body);
    School.alreadyExist(req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'School name already Exist!'
            });
        }else{
          console.log("success");

            School.addSchool(req.body,function(err,count){

                    if(err)
                    {
                      res.json(err);
                    }
                    else{
                      res.json({
                          success: true,
                          message: 'School Added Successfuly!'
                        });//or return count for 1 &amp;amp;amp; 0
                    }
                    });
          }
        }
        
      });

});

router.put('/:id',function(req,res,next){
  School.updateSchool(req.params.id,req.body,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json({
        success: true,
        message: 'School updated Successfuly'
      });
    }
  });
 });


 module.exports=router;