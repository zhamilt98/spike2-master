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
        this.state = { isLoaded: false };
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
                                <div style={{display: this.state.isLoggedIn ? 'block' : 'none' }} className="likeButtonClass" onClick={ async () => { await this.onLikeClick( item ) }}>
                                    <svg id="liked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
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
                </div>
            );
        } else {
            return (<h3>is loading</h3>);
        }
    }
}

export default LikesPage;