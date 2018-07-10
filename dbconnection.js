var mysql=require('mysql');
var connection=mysql.createPool({

    host:'144.217.161.193',
    user:'tabuser',
    password:'t@bs3r@2017',
    database:'tabsera'

});
module.exports=connection;


// var mysql=require('mysql');
//  var connection=mysql.createPool({

// host:'localhost',
//  user:'root',
//  password:'',
//  database:'tabsera'

// });
//  module.exports=connection;