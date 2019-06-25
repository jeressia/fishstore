import React from 'react';
import firebase from 'firebase/app';

import MyNavBar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import Inventory from '../components/Inventory/Inventory';
import NewOrder from '../components/NewOrder/NewOrder';
import Orders from '../components/Orders/Orders';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import fbConnection from '../helpers/data/connection';

fbConnection();

export default class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removelistener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removelistener();
  }

  render() {
    const { authed } = this.state;
    const loadComponent = () => {
      if (authed) {
        return <Home />;
      }
      return <Auth />;
    };

    return (
      <div className="App">
        <MyNavBar authed={this.state.authed}/>
        {loadComponent()}
      </div>
    );
  }
}
