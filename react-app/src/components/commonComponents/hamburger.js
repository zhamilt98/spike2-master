import React from 'react';
import './hamburger.css';
class Hamburger extends React.Component {
    render() {
        // return <h1>Hello, {this.props.name}</h1>;
        const Burger = () => {
            const [showResults, setShowResults] = React.useState(false)
            const onClick = () => setShowResults(true)
            return (
                <div>
                    <label for="check" id="toggle" onClick={onClick}>
                        <input type="checkbox" id="check" />
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    {showResults ? <Menu /> : null}
                </div>
            )
        }

        const Menu = () => (
            <div id="results" className="search-results">
                <button>Home</button><br></br>
                <button>Login</button><br></br>
                <button>Sign Up</button><br></br>
                <button>Profile</button><br></br>
                <button>Log Out</button><br></br>
            </div>
        )

        return (
            <div>
                <Burger />
            </div>
        );
    }
}

export default Hamburger;