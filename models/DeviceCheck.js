var db=require('../dbconnection'); //reference of dbconnection.js
 
var DeviceCheck={ 
 
getAllDeviceIds:function(deviceid , callback){
 
 return db.query("SELECT tbl_allusersForRecentLogin.userid , tbl_allusersForRecentLogin.firstname , tbl_allusersForRecentLogin.lastname  , tbl_users.username  , tbl_users.email, tbl_allusersForRecentLogin.image  FROM  tbl_allusersForRecentLogin , tbl_users WHERE tbl_allusersForRecentLogin.userid = tbl_users.userid AND tbl_users.deviceid = ?", [deviceid],callback);
 
},
getStudent:function(id , callback){
 
return db.query("SELECT firstname , lastname , image FROM tbl_students  WHERE userid =?", [id],callback);
 
},

getParent:function(id , callback){
 
return db.query("SELECT firstname , lastname , image FROM tbl_parents  WHERE userid =?", [id],callback);
 
},

getDetails:function(id , callback){
 
return db.query("SELECT firstname , lastname , image FROM tbl_parents  WHERE userid =?", [id],callback);
 
},
 getCountryById:function(id,callback){
 
return db.query("select * from tbl_countries where countryid=?",[id],callback);
 },
 addCountry:function(Country,callback){
  
 return db.query("Insert into tbl_countries (countryid, fullname,nativename,domainsuffix,gsmcountrycode) values(?,?,?,?,?)",[Country.countryid,Country.fullname,Country.nativename,Country.domainsuffix,Country.gsmcountrycode],callback);
 },
 deleteCountry:function(id,callback){
  return db.query("delete from tbl_countries where countryid=?",[id],callback);
 },
 updateCountry:function(id,Country,callback){
  return db.query("update tbl_countries set fullname=?,nativename=?,domainsuffix=?,gsmcountrycode=? where countryid=?",[Country.fullname,Country.nativename,Country.domainsuffix,Country.gsmcountrycode,id],callback);
 }
 
};
 module.exports=DeviceCheck;