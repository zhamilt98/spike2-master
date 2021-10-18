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

function Tiles(props) {
    const list = props.recipes; 
    const items = list.map( (item) => {
        return (
            <li>
                <Card style={{ width: '18rem', margin: 'auto' }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <ULMaker list={item.usedIngredients} />
                        <ULMaker list={item.missedIngredients} />
                    </Card.Body>
                </Card>
            </li>
        );
    });

    return (
        <ul>{items}</ul>
    );
}
class RecipeList extends React.Component {


    render() {
        if ( this.props.recipes.length > 0 ){
            return ( 
                <div className="recipe_tiles">
                    <Tiles recipes={this.props.recipes}/>
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