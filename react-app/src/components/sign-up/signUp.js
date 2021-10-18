import React from 'react';
import './signUp.css';
import {withRouter} from 'react-router-dom';
const axios = require('axios').default;
class SignUp extends React.Component {
  constructor(params){
    super(params)
    this.state = { };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTextEvent2 = this.handleTextEvent2.bind(this);
    this.handleTextEvent3 = this.handleTextEvent3.bind(this);
    this.handleTextEvent = this.handleTextEvent.bind(this);
  
  }
  handleTextEvent( event ) {
    this.setState({uname: event.target.value});
  }
  handleTextEvent2( event ) {
  this.setState({pass: event.target.value});
  }
  handleTextEvent3( event ) {
  this.setState({pass2: event.target.value});
  }
  async handleSearch( event ) {
    event.preventDefault();
    if(this.state.pass === this.state.pass2) {
      const detail = {
        username: this.state.uname,
        password: this.state.pass
      };
      
      axios.post('api/signup', detail).then( (res) => {
        this.props.history.push('/login'); 
      });
      
    }
  }
  render() {
    return (
        <div>

          <form className="signUpform" onSubmit={this.handleSearch}>
            <h3>Sign Up</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" className="signUpinput" id="uname" onChange={this.handleTextEvent}/>
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" className="signUpinput" id="pass" onChange={this.handleTextEvent2}/>

                <label>Confirm Password</label>
                <input type="text" placeholder="Confirm password" className="signUpinput" id="pass2" onChange={this.handleTextEvent3}/>

           <button type="submit" className="signUpbutton">Sign Up</button>
            
            </form>
          </div>
      
    );
  }
       
}

export default SignUp;