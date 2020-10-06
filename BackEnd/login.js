var express = require('express');
var SHA1 = require('sha1');
var connection = require('./config.js');
var app= express();

module.exports.login=function(req,res){
  var name= req.body.userName;
  var password = req.body.password;
  var encrypted = SHA1(password);
  var sql = "SELECT * FROM userdb where name = '"+name+"' and password = '"+encrypted+"'" ;
  connection.query(sql,function (error, results) {
  if (error) {
    return res.send({
      "code":400,
      "failed":"error ocurred"
                   })
  }
  else{

                
             if(results.length >0)
               {
                global.userNameSS = name; 
                return res.send({
                                  "code":200,
                                  "success":"login sucessfull" , 
                                  "useName":userNameSS                      
                                });
               }
              else
               {
                cookieData();

                function cookieData(){
                  var sql = "SELECT sum(Protein) FROM "+userNameSS+".nutriTrack" ;
                  connection.query(sql, function (err, rows, result) {
                    if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      // console.log(arred["sum(Protein)"]);
                      var sumPro = arred["sum(Protein)"];
                      res.cookie('sumPro', sumPro);
                    });
                  })
          
                  var sql = "SELECT sum(Carbohydrates) FROM "+userName+".nutriTrack" ;
                  connection.query(sql, function (err, rows, result) {
                    if (err) throw err;
                      Object.keys(result).forEach(function(key) {
                        var arr = JSON.stringify(rows[0]);
                        var arred = JSON.parse(arr);
                        // console.log(arred["sum(Carbohydrates)"]);
                        var sumCarbs = arred["sum(Carbohydrates)"];
                        res.cookie('sumCarbs', sumCarbs);
                    });
                  })
          
                  var sql = "SELECT sum(Fat) FROM "+userName+".nutriTrack" ;
                  connection.query(sql, function (err, rows, result) {
                    if (err) throw err;
                      Object.keys(result).forEach(function(key) {
                        var arr = JSON.stringify(rows[0]);
                        var arred = JSON.parse(arr);
                        // console.log(arred["sum(Fat)"]);
                        var sumFat = arred["sum(Fat)"];
                        res.cookie('sumFat', sumFat);
                    });
                  })
          
                  var sql = "SELECT sum(Calories) FROM "+userName+".nutriTrack" ;
                  connection.query(sql, function (err, rows, result) {
                    if (err) throw err;
                      Object.keys(result).forEach(function(key) {
                        var arr = JSON.stringify(rows[0]);
                        var arred = JSON.parse(arr);
                        // console.log(arred["sum(Calories)"]);
                        var sumCal = arred["sum(Calories)"];
                        res.cookie('sumCal', sumCal);
                    });
                  })
                 console.log("Sending user data");
                 // res.sendFile(path.join(__dirname + '/homepage.html'));
              }
                return res.send({
                                   "code":204,
                                   "success":"Email and password does not match"
                               });
               }
         
      

  }
  });
}
/*app.listen(4000,()=>{console.log('Listening on port 4000')
});*/


module.exports.save=function(req, res){
  //if (err) throw err;

  var userName = userNameSS;
  var p = req.body.protein;
  var c = req.body.carbo;
  var f = req.body.fat;
  var inName = req.body.inName;
  var calories = req.body.calculate;

  var nutritrack = "CREATE TABLE IF NOT EXISTS nutritojs."+userName+" (InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
    connection.query(nutritrack, function (err, result) {
      if (err) throw err;
    })

  var dbSql = "CREATE SCHEMA IF NOT EXISTS "+userName;
  connection.query(dbSql, function (err, result) {
    if (err) throw err;
  })
  var dbSqlTable = "CREATE TABLE IF NOT EXISTS "+userName+".nutriTrack (Date VARCHAR(10), InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
  connection.query(dbSqlTable, function (err, result) {
    if (err) throw err;
    console.log("input saved!");
  })

  // var sql = "insert into "+userName+" (InName, Protein, Carbohydrates, Fat, Calories) values ('"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("input saved!");
  // })

  var sql = "insert into "+userName+".nutriTrack (InName, Protein, Carbohydrates, Fat, Calories) values ('"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("input saved!");
  })

}