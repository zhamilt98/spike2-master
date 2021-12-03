'use strict';
var mysql = require('mysql2');

class Db {
  constructor( noRefresh = true ){
    this.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "mydb"
    });
    this.inc = 1;
    if ( noRefresh ) this.createDb();
  }

  createDb() {
    const component = this;
    
    component.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
      component.con.query(`DROP TABLE IF EXISTS myTable`, function (err, result) {
        if (err) throw err;
        console.log("Table dropped");
      });

      component.con.query("CREATE TABLE myTable ( Name varchar(45), Age int )", function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    
      // test data insertion
      // component.con.query(`INSERT INTO myTable VALUES ( 'Kaleb', 23 )`, function (err, result) {
      //   if (err) throw err;
      //   console.log("First row added");
      // });
    
      // component.con.query(`INSERT INTO myTable VALUES ( 'Chelsea', 22 )`, function (err, result) {
      //   if (err) throw err;
      //   console.log("Second row added");
      // }); 

      component.con.query(`DROP TABLE IF EXISTS myTable2`, function (err, result) {
        if (err) throw err;
        console.log("Table dropped");
      });

      component.con.query("CREATE TABLE myTable2 ( id varchar(45), Name varchar(45), Password varchar(45) )", function (err, result) {
        if (err) throw err;
        console.log("Table2 created");
      });

      component.con.query(`DROP TABLE IF EXISTS myTable3`, function (err, result) {
        if (err) throw err;
        console.log("Table dropped");
      });

      component.con.query("CREATE TABLE myTable3 ( id varchar(45), image varchar(255), title varchar(255), recipeId varchar(255) )", function (err, result) {
        if (err) throw err;
        console.log("Table2 created");
      });

    });
  }
  
  queryAll() {
    console.log('starting queryAll');

    return new Promise( function( resolve, reject ){
      this.con.query("SELECT * FROM myTable", function (err, result) {
        if (err) reject();
        console.log("got queryAll");
        console.log(JSON.stringify(result));
        resolve( `${JSON.stringify(result)}` );
      });
    } );
  }
  
  updateDB() {
    const component = this;
    
    component.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected in UPDATE!");
    
      component.con.query(`INSERT INTO myTable VALUES ( 'Carter', 23 )`, function (err, result) {
        if (err) throw err;
        console.log("3rd row added");
      });
    
      component.con.query(`INSERT INTO myTable VALUES ( 'Zach', 23 )`, function (err, result) {
        if (err) throw err;
        console.log("4th row added");
      });
    });
  }
  refreshLoginDd(){
    const component = this;
    
    component.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
      component.con.query(`DROP TABLE IF EXISTS myTable2`, function (err, result) {
        if (err) throw err;
        console.log("Table dropped");
      });

      component.con.query("CREATE TABLE myTable2 ( Name varchar(45), Password varchar(45) )", function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  }
  enterUnamePass(uname, pass){
    const component = this;
    return new Promise( function( resolve, reject ){
      component.con.query(`INSERT INTO myTable2 VALUES ( '${component.inc}', '${uname}',  '${pass}' )`, function (err, result) {
        if (err) reject();
        component.inc += 1;
        resolve( `${JSON.stringify(result)}` );
      });
    });
  }
  returnAcc(uname, password){
    const component = this;
    return new Promise( function( resolve, reject ){
      const query = `SELECT * FROM myTable2 WHERE Name='${uname}' AND Password='${password}'`;
      component.con.query(query, function (err, result) {
        if (err) reject();
        console.log("got queryAll");
        console.log(JSON.stringify(result));
        resolve( result );
      });
    } );
  }

  likeRecipe( id, raw ) {
    const recipe = JSON.parse( raw );
    console.log(`id: ${JSON.stringify(id)}`);
    console.log(`recipe: ${JSON.stringify(recipe)}`);
    const component = this;
    return new Promise( function( resolve, reject ){
      component.con.query(`INSERT INTO myTable3 VALUES ( '${id}', '${recipe.image}', '${recipe.title}', '${recipe.recipeId}' )`, function (err, result) {
        if (err) reject();
        resolve( 200 );
      });
    });
  }

  unlikeRecipe( id, title ) {
    console.log('deleting item');
    console.log(`id: ${id}`);
    console.log(`title: ${title}`);
    const component = this;
    return new Promise( function( resolve, reject ){
      component.con.query(`DELETE FROM myTable3 WHERE id='${id}' AND title='${title}'`, function (err, result) {
        console.log(`res: ${JSON.stringify(result)}`);
        if (err) reject();
        resolve( 200 );
      });
    });
  }

  getLikes( id ) {
    const component = this;
    return new Promise( function( resolve, reject ){
      const query = `SELECT * FROM myTable3 WHERE id='${id}'`;
      component.con.query(query, function (err, result) {
        if (err) reject();
        console.log("got likes");
        console.log(JSON.stringify(result));
        resolve( `${JSON.stringify(result)}` );
      });
    } );
  }
}



module.exports = Db;