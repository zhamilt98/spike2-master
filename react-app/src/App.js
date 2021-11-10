// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import React, { Component } from 'react';
import SearchBar from './components/search-bar/searchBar';
import LoginPage from './components/login-page/loginPage';
import LikesPage from './components/liked-recipe-page/liked-recipe-page';

import SignUp from './components/sign-up/signUp';
import Profile from './components/profile/profile';
import Hamburger from './components/commonComponents/hamburger';

// const https = require('https');
// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

class App extends Component {
  constructor(params){
    super(params)
    this.state = { isLoded: false, dbRes: null };
  }
  componentDidMount() {
  //  fetch('/fetchAll', { agent: httpsAgent })
  //   .then(res => res.json())
  //   .then(result => {
  //     this.setState({
  //       isLoaded: true,
  //       dbRes: result
  //      });
  //    });
    this.setState( { isLoaded: true, dbRes: [] } );
  }

  myHandler() {
    const event = new Event('close-hamburger', { detail: { test: 'test' } } );
    document.body.dispatchEvent( event );
  }
  
  render() {
    // const { dbRes } = this.state;
    const { isLoaded } = this.state;
    if ( isLoaded ){
      return (
        <div>
          <Hamburger />
          <div onClick={this.myHandler} style={{ minHeight: '100vh', minWidth: '75vw' }}>
            <Router>
              <Route path="/" exact component={SearchBar} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/logout" exact component={SearchBar} />
              <Route path="/hamburger" exact component={Hamburger} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/likedRecipes" exact component={LikesPage} />
            </Router>
          </div>
        </div>
        

      );
    } else {
      return (<h3>is loading</h3>);
    }
  }
}

export default App;