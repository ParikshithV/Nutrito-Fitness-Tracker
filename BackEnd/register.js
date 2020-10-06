var express = require('express');
var SHA1 = require('sha1');
var connection = require('./config.js');
var app= express();
var mysql = require('mysql');

module.exports.register=function(req,res){

	   var data={
          "name":req.body.name,
          "email":req.body.email,
          "age":req.body.age,
          "height":req.body.height,
          "weight":req.body.weight,
          "gender":req.body.gender,
          "password":SHA1(req.body.password)
			}
    var name = req.body.name;
    
    var sqluser = "CREATE TABLE IF NOT EXISTS "+name+" (InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))" ;
    connection.query('INSERT INTO userdb SET ?',data,function(err,result){  
    if(err) 
       {
       
       return res.send({
                         "code":400,
                         "failed":"error ocurred"
                      });   
       }
    else
      { 
        
        connection.query(sqluser, function (err, result) {
            if (err) throw err;
            console.log("User registered"+name);
                })
        
        return res.send({
                          "code":200,
                          "success":"user registered sucessfully"
                        });
      }

  });
}

/*app.listen(4000,()=>{console.log('Listening on port 4000')
});*/
