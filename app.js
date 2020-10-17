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
// var cors = require('cors')
// // app.use(cors());
// app.use(cors({
//   origin : "http://localhost:3000",
//   credentials: true,
// }))

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

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });
//
// app.get('/ocr', function(req, res) {
//   res.sendFile(path.join(__dirname + '/basic.html'));
// });

function sleep(ms) {
 return new Promise(
	resolve => setTimeout(resolve, ms)
 );
}

app.post('/nutrito', function(req, res) {
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
              console.log(arred["sum(Protein)"]);
              var sumPro = arred["sum(Protein)"];
              // res.cookie('sumPro', sumPro);
            });
          })

          var sql = "SELECT sum(Carbohydrates) FROM "+userName+".nutriTrack" ;
          con.query(sql, function (err, rows, result) {
            if (err) throw err;
              Object.keys(result).forEach(function(key) {
                var arr = JSON.stringify(rows[0]);
                var arred = JSON.parse(arr);
                console.log(arred["sum(Carbohydrates)"]);
                var sumCarbs = arred["sum(Carbohydrates)"];
                // res.cookie('sumCarbs', sumCarbs);
            });
          })

          var sql = "SELECT sum(Fat) FROM "+userName+".nutriTrack" ;
          con.query(sql, function (err, rows, result) {
            if (err) throw err;
              Object.keys(result).forEach(function(key) {
                var arr = JSON.stringify(rows[0]);
                var arred = JSON.parse(arr);
                console.log(arred["sum(Fat)"]);
                var sumFat = arred["sum(Fat)"];
                // res.cookie('sumFat', sumFat);
            });
          })

          var sql = "SELECT sum(Calories) FROM "+userName+".nutriTrack" ;
          con.query(sql, function (err, rows, result) {
            if (err) throw err;
              Object.keys(result).forEach(function(key) {
                var arr = JSON.stringify(rows[0]);
                var arred = JSON.parse(arr);
                console.log(arred["sum(Calories)"]);
                var sumCal = arred["sum(Calories)"];
                // res.cookie('sumCal', sumCal);
            });
          })
         console.log("Sending user data");
      }
      cookieData();
    //sleep(2000).then(() => { res.sendFile(path.join(__dirname + '/homepage.html')); });
  }
   else {
     //window.location.href = "/nutrito";
   }
});

// app.get('/about', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
//
// app.get('/loginS', function(req, res) {
//     res.sendFile(path.join(__dirname + '/loginPage.html'));
// });
//
// app.get('/registerr', function(req, res) {
//     res.sendFile(path.join(__dirname + '/regPage.html'));
// });

app.post('/login', function(req, res) {
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
        // console.log(userName);
            if(results.length >0)
              {
                global.userNameSS = userName;
                global.userLogin = 1;
                res.cookie('userName', userName);
                // res.status(200).end();

                var dbSql = "CREATE SCHEMA IF NOT EXISTS "+userName;
                con.query(dbSql, function (err, result) {
                  if (err) throw err;
                })
                var dbSqlTable = "CREATE TABLE IF NOT EXISTS "+userName+".nutriTrack (Date VARCHAR(10), InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
                con.query(dbSqlTable, function (err, result) {
                  if (err) throw err;
                  console.log("Database checked");
                })

                //res.redirect('nutrito');
                var sql = "SELECT sum(Protein) FROM "+userName+".nutriTrack" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                  Object.keys(result).forEach(function(key) {
                    var arr = JSON.stringify(rows[0]);
                    var arred = JSON.parse(arr);
                    console.log(arred["sum(Protein)"]);
                    global.sumPro = arred["sum(Protein)"];
                    // res.cookie('sumPro', sumPro);
                  });
                })

                var sql = "SELECT sum(Carbohydrates) FROM "+userName+".nutriTrack" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Carbohydrates)"]);
                      global.sumCarbs = arred["sum(Carbohydrates)"];
                      // res.cookie('sumCarbs', sumCarbs);
                  });
                })

                var sql = "SELECT sum(Fat) FROM "+userName+".nutriTrack" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Fat)"]);
                      global.sumFat = arred["sum(Fat)"];
                      // res.cookie('sumFat', sumFat);
                  });
                })

                var sql = "SELECT sum(Calories) FROM "+userName+".nutriTrack" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Calories)"]);
                      global.sumCal = arred["sum(Calories)"];
                      // res.cookie('sumCal', sumCal);
                  });
                })
                console.log("Sending user data");

                // res.cookie('sumPro', sumPro);
                // res.cookie('sumCarbs', sumCarbs);
                // res.cookie('sumFat', sumFat);
                // res.cookie('sumCal', sumCal);
                // //res.status(200).send();
                setTimeout((function() {
                  res.cookie('sumPro', sumPro);
                  res.cookie('sumCarbs', sumCarbs);
                  res.cookie('sumFat', sumFat);
                  res.cookie('sumCal', sumCal);
                  res.status(200).send()}), 1000);
               }
        else
          {
            global.userLogin = 0;
            res.status(300).send();
            //res.cookie('resp', '300', {maxAge: 1000});
            //res.redirect('loginS');
          }
        }
      });
});

app.post('/save', urlencodedParser, function(req, res){
    //if (err) throw err;
    var userName = userNameSS;
    var inpDate = req.body.currentDate;
    var p = req.body.protein;
    var c = req.body.carbo;
    var f = req.body.fat;
    var inName = req.body.inName;
    var calories = req.body.calculate;

    // var nutritrack = "CREATE TABLE IF NOT EXISTS nutritojs."+userName+" (InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
    // con.query(nutritrack, function (err, result) {
    //   if (err) throw err;
    // })

    var dbSqlTable = "CREATE TABLE IF NOT EXISTS "+userName+".nutriTrack (Date VARCHAR(10), InName VARCHAR(255), Protein VARCHAR(55), Carbohydrates VARCHAR(55), Fat VARCHAR(55), Calories VARCHAR(55))";
    con.query(dbSqlTable, function (err, result) {
      if (err) throw err;
    })

    var sqlnjs = "insert into nutritojs."+userName+" (InName, Protein, Carbohydrates, Fat, Calories) values ('"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
    con.query(sqlnjs, function (err, result) {
      if (err) throw err;
      console.log("input saved!");
    })

    var sql = "insert into "+userName+".nutriTrack (Date, InName, Protein, Carbohydrates, Fat, Calories) values ('"+inpDate+"','"+inName+"','"+p+"','"+c+"','"+f+"','"+calories+"')" ;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("input saved!");
    })


    var sql = "SELECT sum(Protein) FROM "+userName+".nutriTrack" ;
    con.query(sql, function (err, rows, result) {
      if (err) throw err;
      Object.keys(result).forEach(function(key) {
        var arr = JSON.stringify(rows[0]);
        var arred = JSON.parse(arr);
        console.log(arred["sum(Protein)"]);
        global.sumPro = arred["sum(Protein)"];
        // res.cookie('sumPro', sumPro);
      });
    })

    var sql = "SELECT sum(Carbohydrates) FROM "+userName+".nutriTrack" ;
    con.query(sql, function (err, rows, result) {
      if (err) throw err;
        Object.keys(result).forEach(function(key) {
          var arr = JSON.stringify(rows[0]);
          var arred = JSON.parse(arr);
          console.log(arred["sum(Carbohydrates)"]);
          global.sumCarbs = arred["sum(Carbohydrates)"];
          // res.cookie('sumCarbs', sumCarbs);
      });
    })

    var sql = "SELECT sum(Fat) FROM "+userName+".nutriTrack" ;
    con.query(sql, function (err, rows, result) {
      if (err) throw err;
        Object.keys(result).forEach(function(key) {
          var arr = JSON.stringify(rows[0]);
          var arred = JSON.parse(arr);
          console.log(arred["sum(Fat)"]);
          global.sumFat = arred["sum(Fat)"];
          // res.cookie('sumFat', sumFat);
      });
    })

    var sql = "SELECT sum(Calories) FROM "+userName+".nutriTrack" ;
    con.query(sql, function (err, rows, result) {
      if (err) throw err;
        Object.keys(result).forEach(function(key) {
          var arr = JSON.stringify(rows[0]);
          var arred = JSON.parse(arr);
          console.log(arred["sum(Calories)"]);
          global.sumCal = arred["sum(Calories)"];
          // res.cookie('sumCal', sumCal);
      });
    })
    console.log("Sending user data");

    setTimeout((function() {
      res.cookie('sumPro', sumPro);
      res.cookie('sumCarbs', sumCarbs);
      res.cookie('sumFat', sumFat);
      res.cookie('sumCal', sumCal);
      res.status(200).send()}), 1000);
    //res.status(200).send();
  //res.sendFile(path.join(__dirname + '/redirect.html'));
})

app.post('/register', urlencodedParser, function(req, res){
    //if (err) throw err;
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var height = req.body.height;
    var weight = req.body.weight;
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
          res.status(300).send();
          //res.cookie('resp', '300', {maxAge: 1000});
          //res.redirect('registerr');
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
          // res.cookie('resp', '200', {maxAge: 1000});
          // res.redirect('registerr');
          res.status(200).send();
        }
  });
})


app.post('/pakshi', function(req, res) {
  var inDate = req.body.tDate;
  console.log("Date check...");
  var userName = userNameSS;
  var sql = "SELECT sum(Protein) FROM "+userName+".nutriTrack where Date = '"+inDate+"'";
    con.query(sql, function (error,  results, req) {
    if (error) {
   console.log("error ocurred",error);
      }
      else{
        // console.log(userName);
            if(results.length > 0)
              {

                var sql = "SELECT sum(Protein) FROM "+userName+".nutriTrack where Date = '"+inDate+"'";
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                  Object.keys(result).forEach(function(key) {
                    var arr = JSON.stringify(rows[0]);
                    var arred = JSON.parse(arr);
                    console.log(arred["sum(Protein)"]);
                    global.sumPro = arred["sum(Protein)"];
                    // res.cookie('sumPro', sumPro);
                  });
                })

                var sql = "SELECT sum(Carbohydrates) FROM "+userName+".nutriTrack where Date = '"+inDate+"'" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Carbohydrates)"]);
                      global.sumCarbs = arred["sum(Carbohydrates)"];
                      // res.cookie('sumCarbs', sumCarbs);
                  });
                })

                var sql = "SELECT sum(Fat) FROM "+userName+".nutriTrack where Date = '"+inDate+"'" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Fat)"]);
                      global.sumFat = arred["sum(Fat)"];
                      // res.cookie('sumFat', sumFat);
                  });
                })

                var sql = "SELECT sum(Calories) FROM "+userName+".nutriTrack where Date = '"+inDate+"'" ;
                con.query(sql, function (err, rows, result) {
                  if (err) throw err;
                    Object.keys(result).forEach(function(key) {
                      var arr = JSON.stringify(rows[0]);
                      var arred = JSON.parse(arr);
                      console.log(arred["sum(Calories)"]);
                      global.sumCal = arred["sum(Calories)"];
                      // res.cookie('sumCal', sumCal);
                  });
                })
                console.log("Sending user data");

                // res.cookie('sumPro', sumPro);
                // res.cookie('sumCarbs', sumCarbs);
                // res.cookie('sumFat', sumFat);
                // res.cookie('sumCal', sumCal);
                // //res.status(200).send();
                setTimeout((function() {
                  res.cookie('sumPro', sumPro);
                  res.cookie('sumCarbs', sumCarbs);
                  res.cookie('sumFat', sumFat);
                  res.cookie('sumCal', sumCal);
                  res.status(200).send()}), 2000);
               }
        else
          {
            res.status(300).send();
            //res.cookie('resp', '300', {maxAge: 1000});
            //res.redirect('loginS');
          }
        }
      });
});


app.use(function(req, res, next) {
    res.status(404).send("It no work");
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});
