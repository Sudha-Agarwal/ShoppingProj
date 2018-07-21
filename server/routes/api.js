var express = require('express');
var router = express.Router();
//var mongojs  = require('mongojs');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("testDB.db");
const util = require('util');
var paypal = require('paypal-rest-sdk');



paypal.configure({
  'mode': 'sandbox', //sandbox or live
   'client_id' : 'AfYTZosWu-DmRYuk7uuqBuZv1NPcZag5S7pDV3h1We8QRvmPYz8ZkYp5t4GoNXkGf65gEztuuGbSpCDS',  // your paypal application client id
    'client_secret' : 'EJFBq8wV8kxACiGguQ4WwnfDa8gDLlVkwYL7Ry1pDVB2b6aHQOGDFHf_Y19dqsjEEU1UNWxuzG-4-pah', // your paypal application secret id
    'headers' : {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }

});

router.post('/pay',function(req,res){
    console.log("pay");
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
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
       for(var i=0; i < payment.links.length; i++) {
        
        if (payment.links[i].rel === 'approval_url') {
            console.log(payment.links[i].href);
         res.redirect(payment.links[i].href)
        }
      }
    
    } 
    
});

});



router.post('/paynow',function(req,res){
    console.log("pay");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(301,
  {Location: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-58936177892318928#/checkout/guest'}
);
res.end();
});


router.post('/paynow1', function(req, res) {
    console.log("paypal");
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    },
    "description": req.body.description
  }]
};

  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
     // res.redirect(redirectUrl);
    }
  }
});
});

router.get('/list',function(req,res){
    console.log("get list called");
    db.serialize(function(){
        var sql = "select * from User";
        db.all(sql,function(row,err){
            if(err){
                res.send(err);
            }
            else{
                res.send(row);
            }
        });

    });

    //res.send("response from server");
});

router.post('/check-login',function(req,res){
    console.log("login check called");
    var Username = req.body.Username;
    var Password = req.body.Password;

    console.log(Password); 
    console.log(Username); 

    	console.log("get called");
	db.serialize(function(){
			var sql = "SELECT * FROM User WHERE Username = '" + Username + "' AND Password = '" + Password + "'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log("error");
                    console.log(err);
                    res.send(err);
                }
                else{
                    console.log("success");
                console.log(row);
			    res.send(row);    
                } 
			});

		});
});

router.get('/getProductCategory',function(req,res){
    console.log("get category called");
	db.serialize(function(){
			var sql = "SELECT * FROM Category";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                console.log(row);
			    res.send(row);    
                } 
			});

		});
});

router.post('/getProductData',function(req,res){
    var Category = req.body.Category;
    console.log(Category); 

    	console.log("get called");
	db.serialize(function(){
			var sql = "SELECT * FROM Products WHERE Category = '" + Category + "'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                console.log(row);
			    res.send(row);    
                } 
			});

		});
});

router.post('/addProductData',function(req,res){
    var Type = req.body.Type;
    var SKU = req.body.SKU;
    var Category = req.body.Category;
    var Name = req.body.Name;
    var Price = req.body.Price;
    var imgPath = req.body.imgPath;


    

    	console.log("add product called");
		db.serialize(function(){
		
		
			db.run("CREATE TABLE IF NOT EXISTS Products (SKU TEXT,Type TEXT,Category	TEXT,Name	TEXT,Price	INTEGER,imgPath	TEXT)",function(err){
				if(err){
					console.log("error received");
					var err = [{Error:err}];	
					console.log(err);					
					res.send(err);
					}
					
					else{

                        var sql = "SELECT MAX(SUBSTR(SKU,4)) AS MAX_DATA FROM Products";
                        //var sql = "SELECT max(cast((substr(SKU, 4) AS integer)) FROM (SELECT * FROM Products)";
                        db.get(sql,function(err,result){
                            if(err){
                                console.log(err);
                                //res.send(err);
                            }
                            else{
                                var MAX_SKU = parseInt(util.inspect(result.MAX_DATA, false, null).replace(/"|'/g,''));
                                console.log(MAX_SKU+1);
                                var new_SKU = MAX_SKU + 1;
                                //res.send(row);
                                var SKU;
                                

                                var data = [Type,Category,Name,Price,imgPath];
                                var stmt = db.prepare("INSERT into Products (Type,Category,Name,Price,imgPath) values(?,?,?,?,?)");

						    stmt.run(data,function(err){
							if(err){
								console.log("error received");
								//var err = [{Error:err}];	
								console.log(err);					
								res.send(err);
							}
							
							else{
								stmt.finalize();
								var sql = "SELECT SKU , Type , Category, Name, Price, imgPath FROM Products";

								// send the records as JSON
								db.all(sql, function(err, row) {
									if(err){
                                        var err = [{Error:err}];
										res.send(err);
									}
									else
										res.send(row);     
								});							
							}			
						
						});
                            }
                        });

					}
			});	
		});
});

router.post('/updateProductData',function(req,res){
    var Type = req.body.Type;
    var SKU = req.body.SKU;
    var data = [Type,SKU];

    	console.log("update product called");
	db.serialize(function(){
        var stmt = db.prepare("UPDATE Products SET Type = ?  WHERE SKU = ?");
						
			stmt.run(data,function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    stmt.finalize();
                console.log('Row(s) updated:');
                console.log(SKU);
                var sql = "SELECT * FROM Products WHERE SKU = '" + SKU + "'";
                db.all(sql,function(err,row){
                    console.log(row);
                    res.send(row);  
                });
                } 
			});

		});
});

router.post('/deleteProductData',function(req,res){
    var Category = req.body.Category;
    var SKU = req.body.SKU;
    var data = [SKU];
    console.log("SKU " + SKU);

    	console.log("delete product called");
	db.serialize(function(){
        var stmt = db.prepare("DELETE FROM Products WHERE SKU = ?");
						
			stmt.run(data,function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    stmt.finalize();
                console.log('Row(s) deleted:');
                console.log(SKU);
                var sql = "SELECT * FROM Products WHERE Category = '" + Category + "'";
                db.all(sql,function(err,row){
                    console.log(row);
                    res.send(row);  
                });
                } 
			});

		});
});



router.get('/getProductDetails/:SKU',function(req,res){
	console.log("get Product Details called");
    var SKU = req.params.SKU;

	db.serialize(function(){
			var sql = "SELECT * FROM Products WHERE SKU='" + SKU + "'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                console.log(row);
			    res.send(row);    
                } 
			});

		});
	});


router.post('/getCartItems',function(req,res){
    var Username = req.body.Username;      
    console.log("get cart items called");
	db.serialize(function(){
			var sql = "SELECT * FROM Cart WHERE Username = '" + Username + "'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{                
                var total_item = 0;
                var total_price = 0;

                for(var i=0;i<row.length;i++){
                    
                    total_item += row[i].Quantity;
                    total_price += (row[i].Quantity * row[i].Price);
                }
                console.log("item count: " + total_item);
                res.send([{Quantity:total_item,TotalPrice:total_price}]);
			    //res.send(row);    
                } 
			});

		});
});

router.post('/getCartItemsDetail',function(req,res){
    var Username = req.body.Username;      
    console.log("get cart items detail called");
	db.serialize(function(){
			//var sql = "SELECT * FROM Cart WHERE Username = '" + Username + "'";
            var sql = "SELECT * FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{ 
			        res.send(row);    
                } 
			});

            //var sql = "SELECT P.Name FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";

		});
});

router.post('/addItemsToCart',function(req,res){
    console.log("add cart called");
    var Username = req.body.Username;
    var SKU = req.body.SKU;
    var Quantity = req.body.Quantity;
    var Price = req.body.Price;

    var data = [Username,SKU,Quantity,Price];
    	
		db.serialize(function(){

            var sql = "SELECT Quantity FROM Cart WHERE SKU = '" + SKU + "' AND Username = '" + Username + "'";
            // send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{                    
                    if(row.length == 0){
                        var stmt = db.prepare("INSERT into Cart values(?,?,?,?)");
                        stmt.run(data,function(err){
                            if(err){
                                console.log("error received");
					            //var err = [{Error:err}];	
					            console.log(err);					
					            res.send(err);
                            }
                            else{
                                stmt.finalize;
                                //var sql = "SELECT * FROM Cart";
                                var sql = "SELECT * FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";

                                // send the records as JSON
					            db.all(sql, function(err, row) {
					            if(err){
                                    var err = [{Error:err}];
                                    res.send(err);
					            }
                                else{
                                    res.send(row);     
                                }										
				            });		
                            }
                        })
                    }
                    else{
                        	db.serialize(function(){
                            
                    
                            
        var stmt = db.prepare("UPDATE Cart SET Quantity = ?  WHERE SKU = ? AND Username = ?");
		var data1 = [row[0].Quantity+1,SKU,Username];				
			stmt.run(data1,function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    stmt.finalize();
                console.log('Row(s) updated:');
                console.log(SKU);
                //var sql = "SELECT * FROM Products WHERE SKU = '" + SKU + "'";
                var sql = "SELECT * FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";
                db.all(sql,function(err,row){
                    console.log(row);
                    res.send(row);  
                });
                } 
			});

		});
        }                   
                } 
			});					
		});	
	});

    router.post('/UpdateItemsInCart',function(req,res){
    console.log("update cart called");
    var Username = req.body.Username;
    var SKU = req.body.SKU;
    var Quantity = req.body.Quantity;
    var Price = req.body.Price;

    var data = [Username,SKU,Quantity,Price];
    	
		db.serialize(function(){
                         
        var stmt = db.prepare("UPDATE Cart SET Quantity = ?  WHERE SKU = ? AND Username = ?");
		var data1 = [Quantity,SKU,Username];				
			stmt.run(data1,function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    stmt.finalize();
                console.log('Row(s) updated:');
                console.log(SKU);
                //var sql = "SELECT * FROM Products WHERE SKU = '" + SKU + "'";
                var sql = "SELECT * FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";
                db.all(sql,function(err,row){
                    console.log(row);
                    res.send(row);  
                });
                } 
			});

		});       
	});

    router.post('/DeleteItemsInCart',function(req,res){
    console.log("delete cart called");
    var Username = req.body.Username;
    var SKU = req.body.SKU;
    
    	
		db.serialize(function(){
                         
        var stmt = db.prepare("DELETE FROM Cart WHERE SKU = ? AND Username = ?");
		var data1 = [SKU,Username];				
			stmt.run(data1,function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    stmt.finalize();
                console.log('Row(s) updated:');
                console.log(SKU);
                //var sql = "SELECT * FROM Products WHERE SKU = '" + SKU + "'";
                var sql = "SELECT * FROM Products P JOIN Cart C ON P.SKU = C.SKU WHERE C.Username = '" + Username + "'";
                db.all(sql,function(err,row){
                    console.log(row);
                    res.send(row);  
                });
                } 
			});

		});       
	});


router.get('/men-fashion',function(req,res){
	console.log("get called");
	db.serialize(function(){
			var sql = "SELECT * FROM Products WHERE Category = 'Men Fashion'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                console.log(row);
			    res.send(row);    
                } 
			});

		});
	});


    router.get('/women-fashion',function(req,res){
	console.log("get called");
	db.serialize(function(){
			var sql = "SELECT * FROM Products WHERE Category = 'Women Fashion'";
			// send the records as JSON
			db.all(sql, function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                console.log(row);
			    res.send(row);    
                } 
			});

		});
	});




module.exports = router;