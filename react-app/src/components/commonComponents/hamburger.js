import React from 'react';
import './hamburger.css';
class Hamburger extends React.Component {

    constructor( params ) {
        super( params );
        this.state = { showResults: false };
        this.onClick = this.onClick.bind(this);
        this.myHandler = this.myHandler.bind(this);
        this.logoutHandler = this.logoutHandler(this);
    }

    componentDidMount() {
        document.body.addEventListener('close-hamburger', this.myHandler);
        // const https = require('https');
        // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        // fetch('/api/isLoggedIn', { agent: httpsAgent })
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(` on mount: ${JSON.stringify(result)}`);
        //         this.setState({
        //             isLoaded: true,
        //             isLoggedIn: result.isLoggedIn,
        //         });
        //     });
    }

    onClick( ) {
        this.setState( { showResults: !this.state.showResults } );
        this.forceUpdate();
    }

    myHandler( ) {
        this.setState( { showResults: false } );
    }

    logoutHandler( ) {
        this.setState({
            isLoaded: true,
            isLoggedIn: false,
            showResults: false,
        });
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        fetch('/api/logout', { agent: httpsAgent })
            .then(res => res.json())
            .then(() => {
                console.log('logged out');
            });
    }

    render() {
        const component = this;
        // return <h1>Hello, {this.props.name}</h1>;
        const Burger = () => {
            // const [showResults, setShowResults] = React.useState(false);
            // const onClick = () => setShowResults(true);
            // const showResults = false;
            return (
                <div>
                    <label for="check" id="toggle" onClick={component.onClick}>
                        <input type="checkbox" id="check" />
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </label>
                    {this.state.showResults ? <Menu /> : null}
                </div>
            );
        }

        const Menu = () => (
            <div id="results" className="menu">
                <a href="/"><button class="menuButton">Home</button></a><br></br>
                <a href="/login"><button class="menuButton">Login</button></a><br></br>
                <a href="/signup"> <button class="menuButton">Sign Up</button></a><br></br>
                <a href="/profile"><button class="menuButton">Profile</button></a><br></br>
                <button class="menuButton" onClick={this.logoutHandler}> Log Out</button><br></br>
                <a href="/likedRecipes"><button class="menuButton">Likes</button></a><br></br>
            </div>
        )

        return (
            <div style={{ maxWidth: '10vw', margin: 0, float: 'left' }}>
                <Burger />
            </div>
        );
    }
}

export default Hamburger;