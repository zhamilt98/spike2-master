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
      password : 'Zboy1301',
      database : 'ssdi_db'
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
      
    });
  }
  
}

module.exports = Db;