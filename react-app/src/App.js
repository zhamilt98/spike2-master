import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

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
  }
  
  render() {
    const { dbRes } = this.state;
    const { isLoaded } = this.state;
    if ( isLoaded ){
      return (
        <div className="App" id="test">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <body>
            <p>This is an example of a simple HTML page with one paragraph.</p>
            <p>{JSON.stringify(dbRes)}</p>
        </body>
        </div>
      );
    } else {
      return (<h3>is loading</h3>);
    }
  }
}

export default App;