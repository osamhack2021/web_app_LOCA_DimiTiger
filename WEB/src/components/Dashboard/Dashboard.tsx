import React, { Component } from 'react';
import './Dashboard.css';
import Notice from '../Notice/Notice';
import Location from '../Location/Location';
import PersonnelStatus from '../PersonnelStatus/PersonnelStatus';
import Weather from '../Weather/Weather';
import Temperature from '../Temperature/Temperature';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Worker from '../Worker/Worker';

class Dashboard extends Component {
  render() {
    return (
      <div id="dashboard">
        <Notice></Notice>
        <div id="container1">
          <div id="container2">
            <Location></Location>
            <PersonnelStatus></PersonnelStatus>
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