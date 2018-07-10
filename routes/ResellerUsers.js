var express = require('express');
var router = express.Router();
var ResellerUser =require('../models/ResellerUser');
 

router.post('/',function(req,res,next){
  //console.log(req.body);
  	
  				ResellerUser.addResellerUser(req.body,function(err,count){

				  if(err)
				  {
				  	res.json(err);
				  }
				  else{
				  	res.json({
			          success: true,
			          message: 'Reseller User Registered Successfuly!'
			        });//or return count for 1 &amp;amp;amp; 0
				  }
				  });

});


router.get('/:resellerid?',function(req,res,next){
 
  if(req.params.resellerid){
   
    ResellerUser.getUserByResellerId(req.params.resellerid,function(err,rows){
     
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
     
    ResellerUser.getAllResellerUsers(function(err,rows){
     
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


router.get('/user/:userid',function(req,res,next){
// console.log(req);
//if(req.params.gradeid){
  var userid = req.params.userid;

  ResellerUser.getResellerByUserId(userid,function(err,rows){
   
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

    ResellerUser.updateName(req.params.id, req.body, function(err, count){

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