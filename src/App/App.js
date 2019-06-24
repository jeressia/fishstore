import React, { Component } from 'react';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Auth />
        <Home />

      </div>
    );
  }
}
