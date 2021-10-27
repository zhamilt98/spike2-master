import React from 'react';
import './loginPage.css';
const axios = require('axios').default;
class LoginPage extends React.Component {
  constructor(params){
    super(params)
    this.state = { };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTextEvent2 = this.handleTextEvent2.bind(this);
    this.handleTextEvent = this.handleTextEvent.bind(this);
  }
  handleTextEvent( event ) {
    this.setState({uname: event.target.value});
  }
  handleTextEvent2( event ) {
  this.setState({pass: event.target.value});
  }
  async handleSearch( event ) {
    event.preventDefault();
    
    const detail = {
      username: this.state.uname,
      password: this.state.pass
    }
    axios.post('api/login', detail).then( (res) => {
      this.props.history.push('/'); 
      console.log(res);
    });
    
  }
  render() {
    return (
      <div>
          <form class="loginform" onSubmit={this.handleSearch}>
            <h3>Log in</h3>
           
                <label>Username</label>
                <input type="text" placeholder="Enter username" className="logininput" id="username"  onChange={this.handleTextEvent}/>
 
                <label>Password</label>
                <input type="text" placeholder="Enter password" className="logininput" id="password"  onChange={this.handleTextEvent2}/>

            <button type="submit" class="loginbutton">Log in</button>
           
            </form>
        </div>
    );
  }
       
}

export default LoginPage;