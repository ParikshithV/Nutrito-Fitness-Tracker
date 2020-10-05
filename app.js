var mysql = require('mysql');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sha1 = require('sha1');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));

global.userLogin = 0;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nutritojs"
});

const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql1 = "CREATE TABLE IF NOT EXISTS nutritojs.userdb (userName VARCHAR(255), email VARCHAR(255), age VARCHAR(15), height VARCHAR(55), weight VARCHAR(55), gender VARCHAR(55), password VARCHAR(255))";

  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Done!");
  })
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/ocr', function(req, res) {
  res.sendFile(path.join(__dirname + '/basic.html'));
});

function sleep(ms) {
 return new Promise(
	resolve => setTimeout(resolve, ms)
 );
}

app.get('/nutrito', function(req, res) {
  if (userLogin == 1){
    var userName = userNameSS;
    console.log("getting "+userName+"'s data");
    var dbSql = "CREATE SCHEMA IF NOT EXISTS "+userName;
    con.query(dbSql, function (err, result) {
      if (err) throw err;
    })
  function cookieData(){
        var sql = "SELECT sum(Protein) FROM "+userName+".nutriTrack" ;
        con.query(sql, function (err, rows, result) {
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
        con.query(sql, function (err, rows, result) {
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
        con.query(sql, function (err, rows, result) {
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
        con.query(sql, function (err, rows, result) {
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
    cookieData();
    sleep(2000).then(() => { res.sendFile(path.join(__dirname + '/homepage.html')); });
  }
   else {
     res.sendFile(path.join(__dirname + '/loginPage.html'));
   }
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/loginPage.html'));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname + '/regPage.html'));
});

app.post('/loginSession', function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var password_en = sha1(password);
    console.log("Login check...");

    var sql = "SELECT * FROM userdb where userName = '"+userName+"' and password = '"+password_en+"'" ;
    con.query(sql, function (error,  results, req) {
    if (error) {
   console.log("error ocurred",error);
      }
      else{
            if(results.length >0)
              {
                global.userNameSS = userName;
                global.userLogin = 1;
                res.cookie('userName', userName);
                var dbSql = "CREATE SCHEMA IF NOT EXISTS "+userName;
                con.query(dbSql, function (err, result) {
                  if (err) throw err;
                })
                var dbSqlTable = "CREATE TABLE IF NOT EXISTS "+userName+".nutriTrack (Date VARCHAR(10), InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
                con.query(dbSqlTable, function (err, result) {
                  if (err) throw err;
                  console.log("input saved!");
                })
                res.redirect('nutrito');
               }
        else
          {
            global.userLogin = 0;
            res.cookie('resp', '300', {maxAge: 1000});
            res.redirect('login');
          }
        }
      });
});

app.post('/save', urlencodedParser, function(req, res){
    //if (err) throw err;
    var userName = userNameSS;
    var inpDate = req.body.inDate;
    var p = req.body.protein;
    var c = req.body.carbo;
    var f = req.body.fat;
    var inName = req.body.inName;
    var calories = req.body.cal;

    var nutritrack = "CREATE TABLE IF NOT EXISTS nutritojs."+userName+" (InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
    con.query(nutritrack, function (err, result) {
      if (err) throw err;
    })

    var dbSqlTable = "CREATE TABLE IF NOT EXISTS "+userName+".nutriTrack (Date VARCHAR(10), InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
    con.query(dbSqlTable, function (err, result) {
      if (err) throw err;
    })

    var sql = "insert into "+userName+".nutriTrack (Date, InName, Protein, Carbohydrates, Fat, Calories) values ('"+inpDate+"','"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("input saved!");
    })
  res.sendFile(path.join(__dirname + '/redirect.html'));
})

app.post('/signup', urlencodedParser, function(req, res){
    //if (err) throw err;
    var name = req.body.userName;
    var email = req.body.userEmail;
    var age = req.body.userAge;
    var height = req.body.userHeight;
    var weight = req.body.userWeight;
    var gender = req.body.gender;
    var password = req.body.password;
    var password_en = sha1(password);
    var sqlcheck = "select * from userdb where userName= '"+name+"'";
    var sql = "insert into userdb (userName, email, age, height, weight, gender, password) values ('"+name+"','"+email+"','"+age+"','"+height+"','"+weight+"','"+gender+"','"+password_en+"')" ;
    var sqluser = "CREATE TABLE IF NOT EXISTS "+name+" (InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))" ;

    con.query(sqlcheck, function (err, rows, result) {
      if (err) throw err;
      console.log("UserName check");
        if (rows.length > 0) {
          console.log("Username is already taken");
          res.cookie('resp', '300', {maxAge: 1000});
          res.redirect('register');
        } else {
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("input saved!");
          })
          con.query(sqluser, function (err, result) {
            if (err) throw err;
            console.log("User registered");
          })
          console.log("Registration successful!");
          res.cookie('resp', '200', {maxAge: 1000});
          res.redirect('register');
        }
  });
})


app.use(function(req, res, next) {
    res.status(404).send("It no work");
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});
