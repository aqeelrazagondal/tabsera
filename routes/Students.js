//'use strict';
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var Student=require('../models/Student');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sobiarshad2@gmail.com",
        pass: "sobia123"
    }
});
var rand,mailOptions,host,link;


router.get('/',function(req,res,next){
    res.sendfile('../views/index.html');
});

router.post('/',  upload.any() , function(req,res,next){
  //console.log(req.body);
    Student.alreadyExist(req.body, function(err, count){
       var imagepath = null;
      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'Username already Exist!'
            });
        }else{
          //FOR IMAGE upload
           if(req.files){
 

                 imagepath = req.files[0]["path"];

                 var path = imagepath.split("public//", 2);

                 imagepath = path[0];

                 console.log("imagepath ===== ", path);

             }

          console.log("success");
          Student.addUser(req.body,imagepath,function(err,count){

          if(err)
          {
            res.json(err);
          }
          else{
            console.log(req.body.mode);
            if(req.body.mode == 'email'){
                  rand=Math.floor((Math.random() * 100) + 54);
                  host=req.get('host');
                  link="http://"+req.get('host')+"/students/verify?id="+rand;
                  var email = req.body.email;
                  console.log("email", email);
                  mailOptions={
                      to : email,
                      subject : "Please confirm your Email account",
                      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
                  }
                  console.log(mailOptions);
                  smtpTransport.sendMail(mailOptions, function(error, response){
                   if(error){
                          console.log(error);
                      res.end("error");
                   }else{
                    console.log("response ",response);
                      console.log("Message sent: " + response.message);
                      res.end("sent");
                       }
              });
            }
            else if(req.body.mode == 'sms'){
                console.log("its in progress...");
              }
            
            res.json({
                success: true,
                message: 'Student Registered Successfuly!'
              });//or return count for 1 &amp;amp;amp; 0
          }
          });
        }
        
      }
    });

});


router.get('/verify',function(req,res,next){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        var email = mailOptions.to;
        Student.emailVerified(email, function(err,count){
            if(err){
              res.json(err);
            }
            else
            {
              res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            }
          });
        
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

///////////GET LIST OF STUDENT ///////////////

router.get('/childs',function(req,res,next){


Student.getAllChilds(function(err,rows){
 
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

    Student.updateName(req.params.id, req.body, function(err, count){

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


//assign parent
router.patch('/assignParent/:id', function(req,res,next){

Student.checkparent(req.body.parentuserid  , function(err, response){

      if(err){
        res.json(err);
      }

      console.log(response);
      if (response.length) {
    Student.assignParent(req.params.id, req.body , function(err, count){

      if(err){
        res.json(err);
      }
      else{
        res.json({
          success: true,
          message: 'Parrent Associated Successfuly'
        });
      }
    });
      }  else{
            res.json({
            success: false,
            message: 'Parent doesnot exist'
        });
      }
    });

});

//Get profile 
router.get('/profile/:id', function(req,res,next){

    Student.getProfile(req.params.id, function(err, rows){

      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
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

//PROFILE PHOTO
 router.patch('/changeDp/:id', upload.any(),function(req,res,next){


  var imagepath = null;
  //console.log('files data:', req.files);

  if(req.files){
 

       imagepath = req.files[0]["path"];

       var path = imagepath.split("public//", 2);

       imagepath = path[0];

       console.log("imagepath ===== |||", path);

     }



  Student.addProfilePhoto(req.params.id,imagepath,function(err,rows){

   

    if(err)

    {

      res.json(err);

    }

    else

    {
      console.log("imagepath =", imagepath);

      if(imagepath == null){
          res.json({

          success: false,

          message: 'No Profile Photo Uploaded!'

          });

      }

      else {

      res.json({

        success: true,

        message: 'Profile photo updated Successfuly'

      });

    }

    }

  });

 });

module.exports=router;