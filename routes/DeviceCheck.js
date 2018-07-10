var express = require('express');
var router = express.Router();
var DeviceCheck =require('../models/DeviceCheck');

/* GET users listing. */
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
// router.get('/:id',function(req,res,next){


router.get('/:id',function(req,res,next){

  var deviceId = req.params.id;
  console.log(req.params.id);

  DeviceCheck.getAllDeviceIds(deviceId , function(err,rows){
    var FinalResultArray = [];
    if(err)
    {
      res.json(err);
    }
    else
    {

      res.json(rows);

    }

  });

});




module.exports = router;

//e4:ce:8f:5b:a7:fc

// SELECT tbl_students.image
// OR tbl_parents.image
// FROM tbl_users, tbl_students, tbl_parents
// WHERE tbl_users.userid = tbl_students.userid
// AND tbl_users.deviceid =202
// LIMIT 0 , 30

// SELECT description FROM tbl_usertypes  WHERE usertypeid = (SELECT usertypeid FROM tbl_users  WHERE deviceid =202) - USER TYPE CHECK - 

// SELECT userid , image
// FROM tbl_students
// GROUP BY userid
// UNION ALL
// SELECT userid , image
// FROM tbl_parents
// GROUP BY userid


//---------------MAIN QUERY FOR DEVICE ID Retrieving --------//

// SELECT tbl_allusersForRecentLogin.userid , tbl_allusersForRecentLogin.firstname , tbl_allusersForRecentLogin.lastname  , tbl_users.username  , tbl_users.email, tbl_allusersForRecentLogin.image  FROM  tbl_allusersForRecentLogin , tbl_users WHERE tbl_allusersForRecentLogin.userid = tbl_users.userid AND tbl_users.deviceid = 1
var express = require('express');
var router = express.Router();
var DeviceCheck =require('../models/DeviceCheck');

/* GET users listing. */
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
// router.get('/:id',function(req,res,next){


router.get('/:id',function(req,res,next){

  var deviceId = req.params.id;
  console.log(req.params.id);

  DeviceCheck.getAllDeviceIds(deviceId , function(err,rows){
    var FinalResultArray = [];
    if(err)
    {
      res.json(err);
    }
    else
    {

      res.json(rows);

    }

  });

});




module.exports = router;

//e4:ce:8f:5b:a7:fc

// SELECT tbl_students.image
// OR tbl_parents.image
// FROM tbl_users, tbl_students, tbl_parents
// WHERE tbl_users.userid = tbl_students.userid
// AND tbl_users.deviceid =202
// LIMIT 0 , 30

// SELECT description FROM tbl_usertypes  WHERE usertypeid = (SELECT usertypeid FROM tbl_users  WHERE deviceid =202) - USER TYPE CHECK - 

// SELECT userid , image
// FROM tbl_students
// GROUP BY userid
// UNION ALL
// SELECT userid , image
// FROM tbl_parents
// GROUP BY userid


//---------------MAIN QUERY FOR DEVICE ID Retrieving --------//

// SELECT tbl_allusersForRecentLogin.userid , tbl_allusersForRecentLogin.firstname , tbl_allusersForRecentLogin.lastname  , tbl_users.username  , tbl_users.email, tbl_allusersForRecentLogin.image  FROM  tbl_allusersForRecentLogin , tbl_users WHERE tbl_allusersForRecentLogin.userid = tbl_users.userid AND tbl_users.deviceid = 1
