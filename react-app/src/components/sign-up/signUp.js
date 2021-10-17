import React from 'react';
import './signUp.css';
import Form from 'react-bootstrap/Form';
class SignUp extends React.Component {
  render() {
    return (
      
          <form className="signUpform" action="/api/signup" method="post">
            <h3>Sign Up</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" className="signUpinput"/>
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" className="signUpinput"/>

                <label>Confirm Password</label>
                <input type="text" placeholder="Confirm password" className="signUpinput"/>

            <button type="submit" className="signUpbutton">Sign Up</button> 
            
            </form>
      
      
    );
  }
       
}

export default SignUp;