import React, { Component } from 'react';
import './App.css';
import Auth from '../../services/Auth/Auth';
import Routes from './Routes';

class App extends Component {
  componentDidMount() {
    Auth.login({
      "serial": "00-000000",
      "password": "admin"
    });
  }
  render() {
    return (
      <div id="app">
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
