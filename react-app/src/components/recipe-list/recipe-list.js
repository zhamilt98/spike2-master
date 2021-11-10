import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function ULMaker(props) {
    const list = props.list; 
    const res = list.map( (item) => {
        return <li style={{ padding: '0', margin: 'auto', textAlign: 'center', paddingRight: '35px'}}>{item.name}</li>
    });
    return <ul>{res}</ul>;
}

class RecipeList extends React.Component {

    constructor(params){
        super(params);
        this.state = { isLoaded: true };
        this.onLikeClick = this.onLikeClick.bind(this);
    }

    componentDidMount() {
        const component = this;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        fetch('/api/isLoggedIn', { agent: httpsAgent })
            .then(res => res.json())
            .then(result => {
                component.setState({
                    isLoaded: true,
                    isLoggedIn: result.isLoggedIn,
                });
            });
    }

    async likeRecipe( item ) {
        let resp;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        await fetch(`/api/like?recipe=${JSON.stringify( item )}`, { agent: httpsAgent })
        .then(res => res.json())
        .then(result => {
            resp = result; 
        });
        this.setState( { isLoaded: true, value: 'test search', groceries: [], dbRes: resp } );
    }

    async onLikeClick( item ) {
        console.log(`item ${JSON.stringify(item)}`);
        this.setState( { isLoaded: false } );
        await this.likeRecipe( item );
    }
    
    render() {
        if ( this.props.recipes.length > 0 ){
            const items = this.props.recipes.map( (item) => {
                return (
                    <li>
                        <Card style={{ width: '18rem', margin: 'auto' }}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <div style={{display: this.state.isLoggedIn ? 'block' : 'none' }} className="likeButtonClass" onClick={ async () => { await this.onLikeClick( item ) }}>
                                    <svg id="liked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                </div>
                                <Card.Title>{item.title}</Card.Title>
                                <ULMaker list={item.usedIngredients} />
                                <ULMaker list={item.missedIngredients} />
                            </Card.Body>
                        </Card>
                    </li>
                );
            });

            return ( 
                <div>
                    <ul>{items}</ul>
                </div>
            );
        } else {
            return ( 
                <div></div>
            );
        }
    }
}

export default RecipeList;