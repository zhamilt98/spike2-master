import React from 'react';
import './searchBar.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function GroceryList(props) {
    const list = props.groceries; 
    const items = list.map( (item) => {
        return <li>{item.name}</li>
    });

    return (
        <ul>{items}</ul>
    );
}
class SearchBar extends React.Component {
    constructor(params){
        super(params)
        this.state = { isLoaded: true, value: '', groceries: [], dbRes: [] };
        this.handleTextEvent = this.handleTextEvent.bind(this);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getrecipes = this.handleSearch.bind(this);
    }

    handleTextEvent( event ) {
        this.setState({value: event.target.value});
    }

    handleSubmitEvent( event ) {
        const tempList = this.state.groceries; 
        tempList.push( { name: this.state.value } );
        
        event.preventDefault();
        this.setState({ value: '', groceries: tempList });
    }

    handleClear( event ) {
        event.preventDefault();
        this.setState({ value: '', groceries: [] });
    }

    // TO DO: fix this funciton by adding another separate function to make the API call then we can use the isLoading flag to get the values / rerender 
    async handleSearch( event ) {
        event.preventDefault();
        this.setState( { isLoaded: false, value: 'test search', groceries: [], dbRes: [] } );
        await this.getRecipes();
    }

    async getRecipes(  ) {
        let resp;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        await fetch('/fetchAll', { agent: httpsAgent })
        .then(res => res.json())
        .then(result => {
            resp = result; 
        });
        this.setState( { isLoaded: true, value: 'test search', groceries: [], dbRes: resp } );
    }

    render() {
        // return <h1>Hello, {this.props.name}</h1>;
        const { isLoaded } = this.state;
        if ( isLoaded ) {
            return (
                <div>
                    <div className="search_container">
                        <form className="search_form" onSubmit={this.handleSearch}>
                            <label className="search_title">Enter Ingredients</label>
                            <input className="search_title" type="text" value={this.state.value} onChange={this.handleTextEvent}/>
                            <Button variant="success" className="test-class" onClick={this.handleSubmitEvent}>Add Item</Button>
                            <Button variant="secondary" className="test-class" onClick={this.handleClear}>Clear</Button>
                            <Button as="input" type="submit" value="Search"></Button>
                        </form>
                        <div className="ingredients_list">
                            <GroceryList groceries={this.state.groceries}/>
                        </div>
                        <div className="ingredients_list">
                            <p>{JSON.stringify(this.state.dbRes)}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<h3>is loading</h3>);
        }
    }
}

export default SearchBar;