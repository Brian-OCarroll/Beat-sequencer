import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
//=====================================================================================================================================
export class Header extends Component {
  logout() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="Header">
          <div id="logo" />
          <div />
          <div className="header-links">
            <Link to="/home">Home</Link>
          </div>
          <div className="header-links">
            <Link to="/Saved">Saved</Link>
          </div>
          <div className="header-links">
            <Link to="/logout" onClick={() => this.logout()}>
              Logout
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="Header">
        <div id="logo" />
        <div />
        <div className="header-links">
          <Link to="/home">Home</Link>
        </div>

        <div className="header-links">
          <Link to="/saved">Saved</Link>
        </div>
        <div className="header-links">
          <Link to="/login">Login</Link>
        </div>
        <div className="header-links">
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(Header);