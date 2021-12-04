import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class LikesPage extends React.Component {
    constructor(params){
        super(params);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.unlikeRecipe = this.unlikeRecipe.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.state = { isLoaded: false, showPopUp: false };
    }

    componentDidMount() {
        const component = this;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        fetch('/api/getLikes', { agent: httpsAgent })
            .then(res => res.json())
            .then(result => {
                component.setState({
                    isLoaded: true,
                    res: result,
                });
            });
    }

    async unlikeRecipe( item ) {
        let resp;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        await fetch(`/api/unlike?title=${item}`, { agent: httpsAgent })
        // .then(res => res.json())
        .then(result => {
            resp = result; 
        });
        const myArray = this.state.res; 
        myArray.forEach( ( likedItem, index ) => {
            if ( likedItem.title === item ) myArray.splice( index, 1 );
        });
        this.setState( { isLoaded: true, value: 'unliked', res: myArray } );
    }

    async onDeleteClick( item ) {
        console.log(`delete like clicked - item ${JSON.stringify(item.title)}`);
        this.setState( { isLoaded: false } );
        await this.unlikeRecipe( item );
    }

    async onInfoClick( item ) {
        this.setState({ isLoaded: false }); 
        await this.getInfo( item.recipeId );      
    }

    async getInfo( id ){
        let resp;
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        await fetch(`/api/info?recipeId=${id}`, { agent: httpsAgent })
        .then(res => res.json())
        .then(result => {
            resp = result;;
        });
        console.log(`RESP IN INFO CALL UI: ${JSON.stringify(resp)}`);
        this.setState( { isLoaded: true, showPopUp: true, infoItem: resp } )
    }

    closePopUp( event ) {
        event.preventDefault();
        this.setState({
            isLoaded: true,
            showPopUp: false,
            infoItem: undefined,
        });
    }

    render() {
        // return <h1>Hello, {this.props.name}</h1>;
        const { isLoaded } = this.state;
        if ( isLoaded ) {
            const items = this.state.res.map( (item) => {
                return (
                    <li style={{float: 'left'}}>
                        <Card style={{ width: '18rem', margin: 'auto' }}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <div className="likeButtonClass" onClick={ async () => { await this.onDeleteClick( item.title ) }} style={{ textAlign: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{ margins: 'auto' }}>
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                                <div className="likeButtonClass" onClick={ async () => { await this.onInfoClick( item ) }} style={{ textAlign: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                                    </svg>
                                </div>
                                <Card.Title>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </li>
                );
            });
            return (
                <div>
                    <div>
                        <h3>Liked Recipes</h3>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <ul>{items}</ul>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    { this.state.infoItem && this.state.showPopUp ? <div className='popUp'>
                        <Card style={{ width: '60rem', margin: 'auto', position: 'absolute', top: '5vh', left: '25vw' }}>
                            <Card.Img variant="top" src={this.state.infoItem.image} />
                            <Card.Body>
                                <div className="likeButtonClass" onClick={this.closePopUp} style={{ textAlign: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
                                    </svg>
                                </div>
                                <div>{this.state.infoItem.summary.replace(/<[^>]+>/g, '')}</div>
                            </Card.Body>
                        </Card>
                    </div> : null }
                </div>
            );
        } else {
            return (<h3>is loading</h3>);
        }
    }
}

export default LikesPage;