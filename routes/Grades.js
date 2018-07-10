var express = require('express');
var router = express.Router();
var Grade=require('../models/Grade');

// route middleware to verify a token
// router.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {

//     // verifies secret and checks exp 
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {     
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'Zero token provided.' 
//     });

//   }
// });


router.post('/',function(req,res,next){

  Grade.alreadyExist(req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'Grade name already Exist!'
            });
        }else{
          console.log("success");

            Grade.addGrade(req.body,function(err,count){

                    if(err)
                    {
                      res.json(err);
                    }
                    else{
                      res.json({
                          success: true,
                          message: 'Grade Added Successfuly!'
                        });//or return count for 1 &amp;amp;amp; 0
                    }
                    });
          }
        }
        
      }); 

});

router.get('/:id?',function(req,res,next){
 
  if(req.params.id){
   
    Grade.getGradeById(req.params.id,function(err,rows){
       
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
     
    Grade.getAllGrades(function(err,rows){
     
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


router.put('/:id',function(req,res,next){
  Grade.updateGrade(req.params.id,req.body,function(err,rows){
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json({
        success: true,
        message: 'Grade updated Successfuly'
      });
    }
  });
 });


/*

router.post('/',function(req,res,next){
  console.log("inside post");
  console.log(req);
   if (!req.files){
    var img_name = NULL;
    Grade.addGrades(req.body, img_name, function(err,count){

                  if(res.err){
                    res.json(err);
                  }
                  else{
                    res.json({success: true,
                              msg: 'Grade added successfuly'
                            });
                  }

               });
          //return res.status(400).send('No files were uploaded.');
    }else{
        var file = req.files.uploaded_image;
        var img_name=file.name;
        console.log(img_name);

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
               if (err)
 
                 return res.status(500).send(err);

               Grade.addGrades(req.body, img_name, function(err,count){

                  if(res.err){
                    res.json(err);
                  }
                  else{
                    res.json({success: true,
                              msg: 'Grade added successfuly'
                            });
                  }

               });

             });
           }
           else{
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
           }
         }

  });

  */

 module.exports=router;