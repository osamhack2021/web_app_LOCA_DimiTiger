import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';

class App extends Component {  
  render() {
    return (
      <div id="app">
        <Header></Header>
        <Dashboard>

        </Dashboard>
      </div>
    );
  }
}

export default App;
