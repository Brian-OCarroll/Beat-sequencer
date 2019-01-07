import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Switch, BrowserRouter, withRouter} from 'react-router-dom';
import './App.css';
// import Login from './components/login'

import Header from './components/topNav'
import LandingPage from './components/landing-page';
import Dashboard from './components/dashboard';
import RegistrationPage from './components/registration-page';
import {refreshAuthToken} from './actions/auth';
import SeqContainer from './components/sequencer-container';
import  LoginPage  from './components/login-page';
export class App extends Component {

  // constructor() {
  //   super();
  // }


componentDidMount() {

    this.setState({ initialized: true });
};
////////////////////////////////////////////////
componentDidUpdate(prevProps) {
  if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
  } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
  }
}

componentWillUnmount() {
  this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
  this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
  );
}

stopPeriodicRefresh() {
  if (!this.refreshInterval) {
      return;
  }

  clearInterval(this.refreshInterval);
}
///////////////////////////////////////////////
  render() {
    return (
        <div className="Body">
            <Header />
            <Switch>
                <Route exact={true} path="/" component={LandingPage} />
                <Route path="/home" component = {SeqContainer} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/register" component={RegistrationPage} /> 
                <Route path="/login" component={LoginPage} /> 
                <Route path="/dashboard" component={Dashboard} /> 
            </Switch>
        </div>
    );
  }

};

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
