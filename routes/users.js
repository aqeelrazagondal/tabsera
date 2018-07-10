var express = require('express');
var router = express.Router();
var user=require('../models/User');

//Get profile 
router.get('/profile/:id', function(req,res,next){

    user.getProfile(req.params.id, function(err, rows){

      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });

});
/* GET users listing. */
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
/*router.post('/authenticate', function(req, res) {
user.findUser(req.body,function(err,rows){
if(err)
  {
  //res.json(err);
  res.json({ success: false, message: 'Authentication failed. ' });
  }
  else if(rows.length == 0)
  {
    res.json({ success: false, message: req.body });
  }
  else{
  	console.log(rows);
  	result = rows[0];
  	userid = result["userid"];
  	console.log(userid);
  	const payload = {
	      admin: req.body.mobileno 
	    };
  	var token = jwt.sign(payload, app.get('superSecret'), {
        	//expiresIn : 60*60*24 // expires in seconds
        });
  	console.log(token);
  	//console.log(token.length);
  	//var token1 = token.substring(0, 20);
  	//console.log(token1);
  	user.updateUserLoggedIn(userid, token, req.body, function(err,rows){
  		if(err){
  			res.json(err);
        console.log("inside update ",err);
  		}
  		else{

        user.addSession(userid, token, req.body, function(err, count){
        console.log("inside update else");
          if(err){
            res.json(err);
          }
          else{
            res.json({
              success: true,
              userid: userid,
              message: 'Enjoy your token!',
              token: token
            });
          }
        });

  			
  		}
  	});
  }
  });
});*/

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
      console.log("yahan");
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

//logout

router.put('/logout/:id', function(req, res) {

    user.logoutUser(req.params.id, function(err, count){
        if(err){
          res.json(err);
        }
        else{
          res.json({
            success: true,
            message: 'User logged out Successfuly'
          });
        }
    });
});

//change password
router.put('/editPassword/:id', function(req,res,next){

    user.updatePassword(req.params.id, req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        res.json({
          success: true,
          message: 'Password updated Successfuly'
        });
      }
    });
});


//change mobile no
router.put('/editMobileno/:id', function(req,res,next){

    user.alreadyExist(req.params.id, req.body, function(err, count){

      if(err){
        res.json(err);
      }
      else{
        if(count[0]["cnt"] > 0){
          res.json({
              success: false,
              message: 'Mobile no already Exist!'
            });
        }else{
            console.log("success");
            user.updateMobileno(req.params.id, req.body, function(err, count){

            if(err){
              res.json(err);
            }
            else{
              res.json({
                success: true,
                message: 'Mobile no updated Successfuly'
              });
            }
          });
        }
      }
    });
});


module.exports = router;
