var db=require('../dbconnection'); //reference of dbconnection.js

var Country={

    getAllCountries:function(callback){

        return db.query("Select * from tbl_countries",callback);

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
module.exports=Country;