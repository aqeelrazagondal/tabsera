var db=require('../dbconnection'); //reference of dbconnection.js
 
var School={
 
getAllSchools:function(callback){
 
return db.query("Select * from tbl_schools",callback);
 
},
 getSchoolById:function(id,callback){
 
return db.query("select * from tbl_schools where schoolid=?",[id],callback);
 },

 getSchoolByCityId:function(cityid,callback){
 
return db.query("select * from tbl_schools where cityid=?",[cityid],callback);
 },
 
 addSchool:function(School,callback){
 return db.query("Insert into tbl_schools (fullname, cityid, address, lat, lng) values(?,?,?,?,?)",[School.fullname,School.cityid,School.address, School.lat,School.lng],callback);
 },

 alreadyExist:function(School, callback){

 	return db.query('SELECT count(*) as cnt from tbl_schools where fullname=?',[School.fullname],callback);

 },

 updateSchool:function(schoolid, School,callback){

 	return db.query("UPDATE tbl_schools SET fullname=?, cityid=?, address=?, lat=?, lng=? where schoolid=?",[School.fullname,School.cityid,School.address, School.lat, School.lng, schoolid],callback);
 	
 	 },

};
 module.exports=School;