var db=require('../dbconnection'); //reference of dbconnection.js
 
var Unit={
 
getAllUnits:function(callback){
 
return db.query("Select * from tbl_units where isenabled=1",callback);
 
},
 getUnitById:function(id,callback){
 
return db.query("select * from tbl_units where isenabled=1 AND unitid=?",[id],callback);
 },

 getUnitBySubjectId:function(subjectid,callback){
 
return db.query("select * from tbl_units where isenabled=1 AND subjectid=?",[subjectid],callback);
 },
 
 addUnit:function(Unit,callback){
 return db.query("Insert into tbl_units (subjectid, developerid, name, description, unitprice, isdemo, isenabled) values(?,?,?,?,?,?,?)",[Unit.subjectid,Unit.developerid,Unit.name, Unit.description,Unit.unitprice, Unit.isdemo, 1],callback);
 },

 alreadyExist:function(Unit, callback){

 	return db.query('SELECT count(*) as cnt from tbl_units where name=?',[Unit.name],callback);

 },

 updateUnit:function(unitid, Unit,callback){

 	return db.query("UPDATE tbl_units SET subjectid=?, developerid=?, name=?, description=?, unitprice=?, isdemo=b?, isenabled=b? where unitid=?",[Unit.subjectid,Unit.developerid,Unit.name, Unit.description, Unit.unitprice, Unit.isdemo, Unit.isenabled, unitid ],callback);
 
 	 },

 getEnrolledUnits:function(id , callback) {
 	return db.query('SELECT unitid FROM `tbl_unitenrollments` WHERE userid = ? AND isenrolled = 1',[id],callback);
 }


};
 module.exports=Unit;



 //SELECT * FROM `tbl_unitenrollments` WHERE userid = 20