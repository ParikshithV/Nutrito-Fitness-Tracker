var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
	         host:'localhost',
	         user: 'root',
	         password:'',
                 database: 'nutrient_db'

});
connection.connect(function(error){
  if(error)
    console.log("Database Connection Failed !!");
  else
   {
    console.log("Database Connection Successful !!");
    var sql = "CREATE TABLE userdetail_tB2 (name VARCHAR(50),email VARCHAR(50),age VARCHAR(3),height VARCHAR(3),weight VARCHAR(3),gender VARCHAR(2), password VARCHAR(80))";
		connection.query(sql,function(error){
        if(error)
        console.log("TB Creation Failed !!");
        else
        {
        console.log("TB Connected");
        }
				});
		
		
   }
});
