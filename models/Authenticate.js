var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');

var Authenticate={


    findUser:function(User,callback){
        console.log(db);
        console.log(User.username, md5(User.password));
        return db.query("select userid from tbl_users where username=? AND password=?",[User.username, md5(User.password)],callback);
    },

    updateUserLoggedIn:function(userid, token, User, callback){
        return db.query("UPDATE tbl_users SET isloggedin=?, lastlogindate=?, lastloginip=? , sessiontoken=? WHERE userid=?",[1, new Date(), User.lastloginip, token, userid],callback);
    },
    addSession:function(userid, token, User, callback){
        //console.log('Insert into tbl_sessions (sessionid, userid, deviceid, loginip, isactive) values(?,?,?,?,?)',[token,userid,User.deviceid,User.loginip,1]);
        return db.query('Insert into tbl_sessions (sessionid, userid, deviceid, loginip, isactive) values(?,?,?,?,?)',[token,userid,User.deviceid,User.loginip,1], callback);

    }

};

module.exports=Authenticate;
 