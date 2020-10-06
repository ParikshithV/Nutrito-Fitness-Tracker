var mysql = require('mysql');
connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password:''
	

});

connection.connect(function(err) {
  if (err)
	console.log("Connection error");
	else
	console.log("Connected!");
  connection.query("CREATE DATABASE calculate_db", function (err, result) {
  if (err)
	console.log("Creation Fail");
	else
  console.log("Database created");
  
});
});


