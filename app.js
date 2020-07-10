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
  var sql1 = "CREATE TABLE IF NOT EXISTS userdb (userName VARCHAR(255), email VARCHAR(255), age VARCHAR(15), height VARCHAR(55), weight VARCHAR(55), gender VARCHAR(55), password VARCHAR(255))";

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

function getNutriData(dataName, dataFrom){
    var sql = "SELECT "+dataName+" FROM nutritojs."+dataFrom+"" ;
    con.query(sql, function (err, rows, result) {
    if (err) throw err;
    Object.keys(result).forEach(function(key) {
      var arr = JSON.stringify(rows[0]);
      var arred = JSON.parse(arr);
      //console.log(arred[dataName]);
      retData = arred[dataName];
      console.log(dataName+"="+retData);
      return retData;
    });
    })
  }

app.get('/nutrito', function(req, res) {
  var userName = userNameSS;
  //global.userNameSS = userName;
  console.log("getting "+userName+"'s data");
  var sumPro = getNutriData("sum(Protein)", userName);
  var sumCarbs = getNutriData("sum(Carbohydrates)", userName);
  var sumFat = getNutriData("sum(Fat)", userName);
  var sumCal = getNutriData("sum(Calories)", userName);
  console.log("Return check = "+sumCal);
   res.cookie('sumPro', sumPro);
   res.cookie('sumCarbs', sumCarbs);
   res.cookie('sumFat', sumFat);
   res.cookie('sumCal', sumCal);
   res.sendFile(path.join(__dirname + '/homepage.html'));
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
                res.cookie('userName', userName);
                res.redirect('nutrito');
               }
        else
          {
            res.cookie('resp', '300', {maxAge: 1000});
            res.redirect('login');
          }
        }
      });
});

app.post('/save', urlencodedParser, function(req, res){
    //if (err) throw err;
    var userName = userNameSS;
    var p = req.body.protein;
    var c = req.body.carbo;
    var f = req.body.fat;
    var inName = req.body.inName;
    var calories = req.body.cal;
    var sql = "insert into "+userNameSS+" (InName, Protein, Carbohydrates, Fat, Calories) values ('"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("input saved!");
    })
  res.sendFile(path.join(__dirname + '/homepage.html'));
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
