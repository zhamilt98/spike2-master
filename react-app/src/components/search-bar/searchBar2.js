import React from 'react';
import './searchBar.css';
class SearchBar2 extends React.Component {
  render() {
    // return <h1>Hello, {this.props.name}</h1>;

    return (
      <div>
        <header clasName="App-header">

        </header>
        <body>
          <div className="search_container">
            <form>
                <label className="search_title">SEARCH BAR 2</label>
                <input className="search_title" type="text"></input>
                <input type="submit"></input>
            </form>
          </div>
        </body>
      </div>
    );
  }
}

export default SearchBar2;