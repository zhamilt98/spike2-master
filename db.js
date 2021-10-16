'use strict';
var mysql = require('mysql2');

class Db {
  constructor( noRefresh = true ){
    if ( noRefresh ) this.createDb();
  }

  createDb() {
    var con = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password', // password 
      database : 'mydb' // mydb
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
      con.query(`DROP TABLE IF EXISTS myTable`, function (err, result) {
        if (err) throw err;
        console.log("Table dropped");
      });

      con.query("CREATE TABLE myTable ( Name varchar(45), Age int )", function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    
      con.query(`INSERT INTO myTable VALUES ( 'Kaleb', 23 )`, function (err, result) {
        if (err) throw err;
        console.log("First row added");
      });
    
      con.query(`INSERT INTO myTable VALUES ( 'Chelsea', 22 )`, function (err, result) {
        if (err) throw err;
        console.log("Second row added");
      }); 
    });
  }
  
  queryAll() {
    console.log('starting queryAll');
    var con = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password', // password
      database : 'mydb' // mydb
    });

    return new Promise( function( resolve, reject ){
      con.query("SELECT * FROM myTable", function (err, result) {
        if (err) reject();
        console.log("got queryAll");
        console.log(JSON.stringify(result));
        resolve( `${JSON.stringify(result)}` );
      });
    } );
  }
  
  updateDB() {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "mydb"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected in UPDATE!");
    
      con.query(`INSERT INTO myTable VALUES ( 'Carter', 23 )`, function (err, result) {
        if (err) throw err;
        console.log("3rd row added");
      });
    
      con.query(`INSERT INTO myTable VALUES ( 'Zach', 23 )`, function (err, result) {
        if (err) throw err;
        console.log("4th row added");
      });
    });
  }
}

module.exports = Db;