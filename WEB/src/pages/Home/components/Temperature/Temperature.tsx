import React, { Component } from 'react';

import './Temperature.css';

class Temperature extends Component {
  render() {
    return (
      <div id="temperature" className="dash_component">
        <div id="temperature_head">
          <img src="./icons/temperature.svg" alt="temperatureIco" />
          <div id="temperature_num">31</div>
        </div>
        <div id="temperature_contents">온도지수 주의</div>
      </div>
    );
  }
}
export default Temperature;
