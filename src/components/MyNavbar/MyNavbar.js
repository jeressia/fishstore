import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './MyNavbar.scss';

export class MyNavbar extends React.Component {
  static propTypes ={
    authed: PropTypes.bool.isRequired,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    const { authed } = this.props;
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href=".">Fish Store</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            </div>
          </div>
          {authed ? (
            <button className="btn btn-danger my-2 my-sm-0" onClick={this.logMeOut}>Logout</button>
          ) : (
            ''
          )}
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
