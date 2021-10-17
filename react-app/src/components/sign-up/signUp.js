import React from 'react';
import './signUp.css'
import Form from 'react-bootstrap/Form';
class SignUp extends React.Component {
  render() {
    return (
          <form>
            <h3>Sign Up</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" />
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" />

                <label>Confirm Password</label>
                <input type="text" placeholder="Confirm password" />

            <button type="submit">Sign Up</button> 
            
            </form>
      
    );
  }
       
}

export default SignUp;