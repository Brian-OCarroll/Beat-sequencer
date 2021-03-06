import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


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
                <p>If on a mobile device, orient it in the landscape position for full functionality</p>
                <Link to="/home">Home</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);