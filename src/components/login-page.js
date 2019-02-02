import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="home Login">
      <div className="logRegContainer" >
        <h1>Welcome to HyperLoop</h1>
        <LoginForm />
        <h2 className="test">Demo User: demotest</h2>
        <h2 className="test">Demo Pass: demotester</h2>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);