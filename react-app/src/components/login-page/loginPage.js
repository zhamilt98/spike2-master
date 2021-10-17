import React from 'react';
import './loginPage.css'
import Form from 'react-bootstrap/Form';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
          <form action="/api/login" method="post" class="loginform">
            <h3>Log in</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" className="logininput" id="username"/>
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" className="logininput" id="password"/>

            <button type="submit" class="loginbutton">Log in</button>
           
            </form>
        </div>
    );
  }
       
}

export default LoginPage;