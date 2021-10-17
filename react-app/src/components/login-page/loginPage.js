import React from 'react';
import './loginPage.css'
import Form from 'react-bootstrap/Form';
class LoginPage extends React.Component {
  render() {
    return (
          <form>
            <h3>Log in</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" />
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" />

            <button type="submit">Sign in</button> 
            <button type="submit">Sign Up</button> 
            </form>
      
    );
  }
       
}

export default LoginPage;