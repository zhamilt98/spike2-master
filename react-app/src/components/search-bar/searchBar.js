import React from 'react';
import './searchBar.css';
class SearchBar extends React.Component {
  render() {
    // return <h1>Hello, {this.props.name}</h1>;

    return (
        <div>
            <body>
                <div className="search_container">
                    <form>
                        <label className="search_title">Test Label AGAIN</label>
                        <input className="search_title" type="text"></input>
                        <input type="submit"></input>
                    </form>
                </div>
            </body>
        </div>
        
    );
  }
}

export default SearchBar;