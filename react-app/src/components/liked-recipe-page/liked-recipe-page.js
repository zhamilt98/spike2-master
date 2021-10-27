import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

class LikesPage extends React.Component {
    constructor(params){
        super(params);
        this.state = { isLoaded: true };
    }

    render() {
        // return <h1>Hello, {this.props.name}</h1>;
        const { isLoaded } = this.state;
        if ( isLoaded ) {
            return (
                <div>
                    <div>
                        <h3>Liked Recipes</h3>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col>Test</Col>
                            </Row>
                            <Row>
                                <Col>Test2</Col>
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