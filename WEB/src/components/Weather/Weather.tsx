import React, { Component } from 'react';
import './Weather.css';
import weatherIco from './weather.svg';

class Weather extends Component {
  render() {
    return (
        <div id="weather" className="dash_component">
            <div id="weather_head">
              <img src={weatherIco} alt="weatherIco"/>
              <div id="weather_num">31°</div>
            </div>
            <div id="weather_contents">
              구름조금
            </div>
        </div>
      );
    }
  }
export default Weather;