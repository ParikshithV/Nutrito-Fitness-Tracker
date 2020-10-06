var express = require('express');
var router= express.Router();
var SHA1 = require('sha1');
var connection = require('./config.js');
var app= express();

router.post('/signup',function(req,res){
	   var data={
          "name":req.body.name,
          "email":req.body.email,
          "age":req.body.email,
          "height":req.body.height,
          "weight":req.body.weight,
          "gender":req.body.gender,
          "password":SHA1(req.body.password)
         
          
				}

    connection.query('INSERT INTO userdetail_tb2 SET ?',data,function(err){
    if(err) throw err;
    else
      {
        return res.send("Successfully added");
      }

  });
});
module.exports=router;

app.listen(4000,()=>{console.log('Listening on port 4000')
 });
