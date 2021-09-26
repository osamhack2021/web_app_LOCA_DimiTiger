import React, { Component } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../components/Header/Header';


class Home extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default Home;