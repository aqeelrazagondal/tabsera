var db=require('../dbconnection'); //reference of dbconnection.js
 
var UnitEnrollment={
 
addUnitEnrollment:function(UnitEnrollment,callback){
	
	 return db.query("Insert into tbl_unitenrollments (userid, unitid, tranid, unitcost, enrollmethodid, isenrolled) values(?,?,?,?,?,?)",[UnitEnrollment.userid, UnitEnrollment.unitid,UnitEnrollment.tranid,UnitEnrollment.unitcost,UnitEnrollment.enrollmethodid,1],callback);
	 
 },

 getAllUnitEnrollments:function(callback){
 
return db.query("Select * from tbl_unitenrollments",callback);
 
},
 getUnitEnrollmentByUserId:function(id,callback){
 
return db.query("select * from tbl_unitenrollments where userid=?",[id],callback);
 },

getUnitEnrollByUserUnitId:function(userid, unitid, callback){
 
 console.log("userid" +userid);
 console.log("unitid" + unitid);
return db.query("select * from tbl_unitenrollments where userid=? AND unitid=?",[userid, unitid],callback);
 },


};
 module.exports=UnitEnrollment;