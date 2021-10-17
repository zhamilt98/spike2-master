import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import React, { Component } from 'react';
import SearchBar from './components/search-bar/searchBar';
import loginPage from './components/login-page/loginPage';
import signUp from './components/sign-up/signUp'

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
        <Router>
          <Route path="/" exact component={SearchBar} />
          <Route path="/login" exact component={loginPage} />
          <Route path="/signup" exact component={signUp} />
        </Router>
      );
    } else {
      return (<h3>is loading</h3>);
    }
  }
}

export default App;