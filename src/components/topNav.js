import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './styleNav.css'
//=====================================================================================================================================
export class Header extends Component {
  logout() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    // <Redirect to="/home" />
    this.props.history.push('/home')
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <ul className="Header">
          <li id="logo" />
         
          <li className="header-links">
            <Link to="/home">Home</Link>
          </li>
          <li className="header-links">
            <Link to="/logout" onClick={() => this.logout()}>
              Logout
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className="Header">
        <li id="logo" />
  
        <li className="header-links">
          <Link to="/home">Home</Link>
        </li>
        <li className="header-links">
          <Link to="/login">Login</Link>
        </li>
        <li className="header-links">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(Header);