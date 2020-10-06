var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password:'',
	database: 'nutrient_db'

});

connection.connect(function(err) {
  if (err)
	console.log("Connection error");
  else
	console.log("Connected!");
var sql1 = "CREATE TABLE IF NOT EXISTS nutrient_db.userdb (name VARCHAR(255), email VARCHAR(255), age VARCHAR(15), height VARCHAR(55), weight VARCHAR(55), gender VARCHAR(55), password VARCHAR(255))";

        connection.query(sql1, function (err, result) {
          if (err) throw err;
          console.log("Done!");
  })

});
module.exports = connection;
