import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
// import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/home" />;
    // }

    return (
        <div className="home">
            <div className="overlay">
                <h1>Welcome HyperLoop</h1>
                <p>HyperLoop is a 1 bar 16 step drum sequencer with over 100 drum samples to choose from. </p>
                <p>Tracks can be added and removed with the click of a button and if logged in can be saved for 
                    future use.</p>
                <p>Click the midi-sounds logo for customizable EQ settings.</p>
                <Link to="/home">Home</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);