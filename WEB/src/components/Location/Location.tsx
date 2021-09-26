import React, { Component } from 'react';
import LocationChart from '../LocationChart/LocationChart';
import './Location.css';


class Location extends Component {
  render() {
    return (
        <div id="location" className="dash_component">
            <div className="headline">
              <h1>유동병력 현황판</h1>
            </div>
            <LocationChart></LocationChart>
        </div>
      );
    }
  }
export default Location;