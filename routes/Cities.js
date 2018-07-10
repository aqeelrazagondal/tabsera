var express = require('express');
var router = express.Router();
var City=require('../models/City');

router.get('/:id?',function(req,res,next){

  if(req.params.id){

    City.getCityById(req.params.id,function(err,rows){

      if(err)
      {
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
  else{

    City.getAllCities(function(err,rows){

      if(err)
      {
        res.json(err);
      }
      else
      {
        res.json(rows);
      }

    });
  }
});

router.get('/country/:countryid',function(req,res,next){

  var countryid = req.params.countryid;

  City.getCityByCountryId(countryid,function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(rows);
    }

  });
//}
});


module.exports=router;