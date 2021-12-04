import React from 'react';
import './hamburger.css';
class Hamburger extends React.Component {

    constructor( params ) {
        super( params );
        this.state = { showResults: false };
        this.onClick = this.onClick.bind(this);
        this.myHandler = this.myHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('close-hamburger', this.myHandler);
        document.body.addEventListener('hamburger-login', this.loginHandler);
        this.checkLogin();
    }

    onClick( ) {
        const component = this;
        component.checkLogin();
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

    checkLogin(){
        console.log('updating state of hambuger');
        const https = require('https');
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        fetch('/api/isLoggedIn', { agent: httpsAgent })
            .then(res => res.json())
            .then(result => {
                console.log(` on mount: ${JSON.stringify(result)}`);
                this.setState({
                    isLoaded: true,
                    isLoggedIn: result.isLoggedIn,
                });
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
                    <label id="toggle" onClick={component.onClick}>
                        <input type="checkbox" id="check" />
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </label>
                    {this.state.showResults ? <Menu /> : null}
                </div>
            );
        };

        const Menu = () => { return (
            <div id="results" className="menu">
                <a href="/"><button className="menuButton">Home</button></a><br></br>
                { !this.state.isLoggedIn ? <div><a href="/login"><button className="menuButton">Login</button></a><br></br></div> : null }
                { !this.state.isLoggedIn ? <div><a href="/signup"> <button className="menuButton">Sign Up</button></a><br></br></div> : null }
                {/* { this.state.isLoggedin ? <div><a href="/profile"><button class="menuButton">Profile</button></a><br></br></div> : null } */}
                { this.state.isLoggedIn ? <div><button className="menuButton" onClick={this.logoutHandler}> Log Out</button><br></br></div> : null }    
                { this.state.isLoggedIn ? <div><a href="/likedRecipes"><button className="menuButton">Likes</button></a><br></br></div> : null }
            </div>
        ); };

        return (
            <div style={{ maxWidth: '10vw', margin: 0, float: 'left' }}>
                <Burger />
            </div>
        );
    }
}

export default Hamburger;