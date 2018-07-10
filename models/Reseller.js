var db=require('../dbconnection'); //reference of dbconnection.js
 
var Reseller = {

addReseller:function(Reseller,callback){
	     //var userid = 2;
	      return db.query("Insert into tbl_resellers (adminuserid, companyname, schoolid, credit, cityid, commission, address, lat, lng) values(?,?,?,?,?,?,?,?,?)",[Reseller.adminuserid, Reseller.companyname,Reseller.schoolid,Reseller.credit,Reseller.cityid,Reseller.commission,Reseller.address,Reseller.lat,Reseller.lng],callback);
	  
	},
 
getAllResellers:function(callback){
 
return db.query("Select * from tbl_resellers",callback);
 
},
 getResellerById:function(id,callback){
 
return db.query("select * from tbl_resellers where resellerid =?",[id],callback);
 },

 getResellerByAdminuserId:function(adminuserid, callback){

 	return db.query("select * from tbl_resellers where adminuserid=?",[adminuserid], callback);
 },

  checkAmount:function(EWallet, callback){

 	console.log('SELECT amount FROM `tbl_resellers` where resellerid = ?',[EWallet.resellerid]);
 	return console.log(db.query('SELECT count(*) as cnt FROM `tbl_resellers` WHERE resellerid=? and credit>?',[EWallet.resellerid, EWallet.amount],callback));

 },

 
};
 module.exports=Reseller;