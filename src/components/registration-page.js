import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <div className="home registration">
            <div className="logRegContainer">
                <h1>Register for HyperLoop</h1>
                <RegistrationForm />
                {/* <Link to="/login">Login</Link> */}
            </div>
           
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);