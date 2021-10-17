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
            <div id="results" className="menu">
                <a href="/"><button>Home</button></a><br></br>
                <a href="/login"><button >Login</button></a><br></br>
                <a href="/signup"> <button>Sign Up</button></a><br></br>
                <a href="/profile"><button>Profile</button></a><br></br>
                <a href="/"><button> Log Out</button></a><br></br>
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