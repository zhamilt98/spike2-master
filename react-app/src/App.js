import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import React, { Component } from 'react';
import SearchBar from './components/search-bar/searchBar';
import LoginPage from './components/login-page/loginPage';
import Hamburger from './components/commonComponents/hamburger';
import SignUp from './components/sign-up/signUp'

const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

class App extends Component {
  constructor(params){
    super(params)
    this.state = { isLoded: false, dbRes: null };
  }
  componentDidMount() {
    fetch('/fetchAll', { agent: httpsAgent })
    .then(res => res.json())
    .then(result => {
      this.setState({
        isLoaded: true,
        dbRes: result
       });
     });
    //this.setState( { isLoaded: true, dbRes: [] } );
  }
  
  render() {
    const { dbRes } = this.state;
    const { isLoaded } = this.state;
    if ( isLoaded ){
      return (
        <div>
          <Hamburger />
          <Router>
            <Route path="/" exact component={SearchBar} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/hamburger" exact component={Hamburger} />
            <Route path="/signup" exact component={SignUp} />
          </Router>
        </div>
        
      );
    } else {
      return (<h3>is loading</h3>);
    }
  }
}

export default App;