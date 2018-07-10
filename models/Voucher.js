var db=require('../dbconnection'); //reference of dbconnection.js
 
var Voucher={
 
addVoucher:function(Voucher,callback){
	
	 return db.query("Insert into tbl_vouchers (vouchercode, credit, resellerid, isWelcome, usedbyuserid, expirydate,useddate) values(?,?,?,b?,?,TIMESTAMP(?),?)",[Voucher.vouchercode, Voucher.credit,Voucher.resellerid,Voucher.isWelcome,Voucher.usedbyuserid,Voucher.expirydate,Voucher.useddate],callback);
	 
 }

};
 module.exports=Voucher;