var db=require('../dbconnection'); //reference of dbconnection.js

var City={

    getAllCities:function(callback){

        return db.query("Select * from tbl_cities",callback);

    },
    getCityById:function(id,callback){

        return db.query("select * from tbl_cities where cityid=?",[id],callback);
    },
    getCityByCountryId:function(countryid,callback){

        return db.query("select * from tbl_cities where countryid=?",[countryid],callback);
    }

};
module.exports=City;