import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../routes/Home';
import Login from '../Login/Login';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/home' component={Home} exact />
        </Switch>
      </Router>
    );
  }
}

export default Routes;