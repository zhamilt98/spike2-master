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
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </label>
                    {showResults ? <Menu /> : null}
                </div>
            )
        }

        const Menu = () => (
            <div id="results" className="menu">
                <a href="/"><button class="menuButton">Home</button></a><br></br>
                <a href="/login"><button class="menuButton">Login</button></a><br></br>
                <a href="/signup"> <button class="menuButton">Sign Up</button></a><br></br>
                <a href="/profile"><button class="menuButton">Profile</button></a><br></br>
                <a href="/"><button class="menuButton"> Log Out</button></a><br></br>
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