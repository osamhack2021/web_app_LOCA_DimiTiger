import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from '../../routes/Home';
import Login from '../Login/Login';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Switch>
            <PublicRoutes path='/' restricted={true} component={Login} exact />
            <PrivateRoutes path='/home' component={Home} exact />
          </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
