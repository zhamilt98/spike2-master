import React from 'react';
import './searchBar.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeList from '../recipe-list/recipe-list';

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
        super(params);
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
        this.setState({ value: '', groceries: [], dbRes: [] });
    }

    // TO DO: fix this funciton by adding another separate function to make the API call then we can use the isLoading flag to get the values / rerender 
    async handleSearch( event ) {
        const groceryList = this.state.groceries;
        event.preventDefault();
        this.setState( { isLoaded: false, value: '', groceries: [], dbRes: [] } );
        await this.getRecipes( groceryList );
    }

    async getRecipes( ingredients ) {
        let resp;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });


        await fetch(`/api/search?list=${JSON.stringify( ingredients )}`, { agent: httpsAgent })
        .then(res => res.json())
        .then(result => {
            resp = result; 
        });
        this.setState( { isLoaded: true, value: '', groceries: [], dbRes: resp } );
    }

    render() {
        // return <h1>Hello, {this.props.name}</h1>;
        const { isLoaded } = this.state;
        if ( isLoaded ) {
            return (
                <div>
                    <div className="search_container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15vw" height="15vh" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style={{margin: 'auto', marginBottom: '25px'}}>
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                        <form className="search_form" onSubmit={this.handleSearch}>
                            <label>Enter Ingredients</label>
                            <input className="search_title" type="text" value={this.state.value} onChange={this.handleTextEvent}/>
                            <Button variant="success" className="test-class" onClick={this.handleSubmitEvent}>Add Item</Button>
                            <Button variant="secondary" className="test-class" onClick={this.handleClear}>Clear</Button>
                            <Button as="input" type="submit" value="Search" style={{ marginLeft: '10px'}}></Button>
                        </form>
                        <div className="ingredients_list">
                            <GroceryList groceries={this.state.groceries}/>
                        </div>
                        <div className="ingredients_list">
                            <RecipeList recipes={this.state.dbRes} />
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