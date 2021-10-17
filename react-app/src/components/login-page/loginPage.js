import React from 'react';
import './loginPage.css'
import Form from 'react-bootstrap/Form';
var mysql = require('mysql2');
class LoginPage extends React.Component {
  constructor(params){
    super(params)
    this.db= mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Zboy1301",
      database: "ssdi_db"
    });
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
}

  handleSubmitEvent( un,pw ) {
    this.db.query(`select * from users where username='${un}';`,function (err, result) {
     if(err){}
     else if(result !== null){
       if(result.password===pw){
         console.log("login")
       }
     }
    })
}

  render() {
    return (
          <form>
            <h3>Log in</h3>
           
                <label>Username</label>
                <input name="un" type="text" placeholder="Enter username" />
 
                <label>Password</label>
                <input name="pw" type="text" placeholder="Enter password" />

            <button type="submit" onClick={this.handleSubmitEvent(document.getElementsByName("un").values,document.getElementsByName("pw").values)}>Sign in</button> 
            <button type="submit">Sign Up</button> 
            </form>
      
    );
  }
       
}

export default LoginPage;