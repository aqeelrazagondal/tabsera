var express = require('express');
var router = express.Router();
var StdEWallet=require('../models/StdEWallet');
var paypal = require('paypal-rest-sdk');

// route middleware to verify a token

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp 
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {     
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});


//Balance Purchase from reseller
router.post('/balanceTrans', function(req, res, next){

      StdEWallet.addStdBalanceTrans(req.body, function(err, count){

        if(err){
            res.json(err);
        }
        else{
          StdEWallet.updateReseller(req.body, function(err,count){
            if(err){
              res.json(err);
            }
            else
            {
              res.json({
              success: true,
              message: 'Transaction done Successfuly'
            });
            }
          });
            
        }

      });
});

//paypal route 
// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AQcYcG614w461P0KpCfXTUdMaoAmJMgvqQNsv05vJn9FH8pTrvAL91LVcG4epaBLyrF5jnW6adnpJ0SD', // please provide your client id here 
  'client_secret': 'EHwjL8u60ltcdBVzUYAHoiwW_6upYXwfap_UzndOT1EhRUTNTYIF8ti-gW3OIPwRcNzGZ8wILGLjtZv_' // provide your client secret here 
});

// start payment process 
router.get('/buy' , ( req , res ) => {
  // create payment object 
  
    var payment = {
            "intent": "authorize",
      "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://www.google.com",
    "cancel_url": "www.facebook.com"
  },
  "transactions": [{
    "amount": {
      "total": 39.00,
      "currency": "USD"
    },
    "description": " a book on mean stack "
  }]
    }
  // call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
          // redirect to paypal where user approves the transaction 
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });


}); 



router.post('/pay/:id' , ( req , res ) => { 
var paymentMethodID = req.params.id;
console.log("gradeid ---------------========== " +paymentMethodID);

  if(paymentMethodID == 1 ){
var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Mathematcis Course",
                "sku": "MMKG1",
                "price": "33.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "33.00"
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        res.send(error);
    } else {
        console.log("Create Payment Response" , payment.links[1].rel);
        console.log(payment);
        //res.send('Integrated Successfuly!');
        for(let i =0; i < payment.links.length; i++){
          if(payment.links[i].method==="REDIRECT"){
            res.redirect(payment.links[i].href);
          }
        }
    }
});

}

else {
       res.send("Other Payment Method is called!")
}

});


// helper functions 
var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}           
  
router.get('/success' , (req, res) =>{
const payerId = req.query.PayerId;
const paymentId = req.query.paymentId;

const execute_payment_json = {

   "payer_id": payerId,
    "transactions" : [{
    "amount": {
      "currency": "USD",
      "total": "25.00"
    }

  }]

};

paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
    }
});


});
 
module.exports=router;