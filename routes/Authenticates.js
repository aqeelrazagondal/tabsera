var express = require('express');
var router = express.Router();
var user= require('../models/Authenticate');

/* GET users listing. */
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {
    user.findUser(req.body, function(err,rows){
        if(err)
        {
            //res.json(err);
            res.json({ success: false, message: 'Authentication failed.! ' + err });
        }
        else if(rows.length == 0)
        {
            res.json({ success: false, message: 'Authentication failed.1 ' });
        }
        else{
            console.log(rows);
            result = rows[0];
            userid = result["userid"];
            console.log(userid);
            const payload = {
                admin: req.body.username
            };
            var token = jwt.sign(payload, app.get('superSecret'), {
                //expiresIn : 60*60*24 // expires in seconds
            });
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
                                message: 'Authentication successfull!',
                                token: token
                            });
                        }
                    });


                }
            });
        }
    });
});


module.exports = router;
