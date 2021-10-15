import React, { Component } from 'react';

import './Dashboard.css';

import TreeChart from '../LocationChart/TreeChart';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Notice from '../Notice/Notice';
import Temperature from '../Temperature/Temperature';
import Weather from '../Weather/Weather';
import Worker from '../Worker/Worker';

class Dashboard extends Component {
  render() {
    return (
      <div id="dashboard">
        <Notice></Notice>
        <div id="container1">
          <div id="container2">
            <TreeChart />
          </div>
          <div id="container3">
            <Weather></Weather>
            <Temperature></Temperature>
            <MilitaryDiscipline></MilitaryDiscipline>
            <Worker></Worker>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
