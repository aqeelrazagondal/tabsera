var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var Parent=require('../models/Parent');
 
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


router.post('/', upload.any(), function(req,res,next){
  console.log(req.body);
  	Parent.alreadyExist(req.body, function(err, count){
 var imagepath = null;
  		if(err){
  			res.json(err);
  		}
  		else{
  			if(count[0]["cnt"] > 0){
  				res.json({
		          success: false,
		          message: 'username already Exist!'
		        });
  			}else{
  				console.log("success");
          if(req.files){
 

             imagepath = req.files[0]["path"];

             var path = imagepath.split("public//", 2);

             imagepath = path[0];

             console.log("imagepath ===== |||", path);

            }
				Parent.addParent(req.body,imagepath, function(err,count){

				  if(err)
				  {
				  	res.json(err);
				  }
				  else{
				  	if(req.body.mode == 'email'){
                  rand=Math.floor((Math.random() * 100) + 54);
                  host=req.get('host');
                  link="http://"+req.get('host')+"/parents/verify?id="+rand;
                  var email = req.body.email;
                  console.log("email", email);
                  mailOptions={
                      to : email,
                      subject : "Please confirm your Email account. ",
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
                message: 'Parent Registered Successfuly!'
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
        Parent.emailVerified(email, function(err,count){
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


//change name
router.put('/editName/:id', function(req,res,next){

    Parent.updateName(req.params.id, req.body, function(err, count){

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


//list them all 
router.get('/list',function(req,res,next){


Parent.list(function(err,rows){
 
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


//assign Child
router.patch('/assignChild/:id', function(req,res,next){

    Parent.assignChild(req.params.id, req.body , function(err, count){

      if(err){
        res.json(err);
      }
      else{
        res.json({
          success: true,
          message: 'Child Associated Successfuly'
        });
      }
    });

});

//Get profile 
router.get('/profile/:id', function(req,res,next){

    Parent.getProfile(req.params.id, function(err, rows){

      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });

});


//PROFILE PHOTO CHNAGE
 router.patch('/changeDp/:id', upload.any(),function(req,res,next){


  var imagepath = null;
  //console.log('files data:', req.files);

  if(req.files){
 

       imagepath = req.files[0]["path"];

       var path = imagepath.split("public//", 2);

       imagepath = path[0];

       console.log("imagepath ===== |||", path);

     }



  Parent.addProfilePhoto(req.params.id,imagepath,function(err,rows){

   

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


//Get profile 
router.get('/test', function(req,res,next){

console.log("Hello , i am being called");

});
module.exports=router;