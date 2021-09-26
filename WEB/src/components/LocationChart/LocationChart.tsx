import React, { Component } from 'react';
import './LocationChart.css'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'


class LocationChart extends Component {

  data = {
    "name": "root",
    "children": [
      {
        "name": "생활관",
        "value": 20
      },
      {
        "name": "오락실",
        "value": 8
      },
      {
        "name": "PX",
        "value": 5
      },
      {
        "name": "연병장",
        "value": 3
      },
    ]
  }
  gradProps = {
    gradientUnits: 'userSpaceOnUse',
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '480'
  };
  
  render() {
    return (
        <div id="locationChart">
          <div style={{ width: 0 }}>
            <svg>
              <defs>
                <linearGradient id="gradientId1" {...this.gradProps} >
                  <stop offset="25%" stopColor="#EEEEEE" />
                  <stop offset="75%" stopColor="#A4A4A4" />
                </linearGradient>
                <linearGradient id="gradientId2" {...this.gradProps} >
                  <stop offset="25%" stopColor="#F9D7FF" />
                  <stop offset="75%" stopColor="#C84CF3" />
                </linearGradient>
                <linearGradient id="gradientId3" {...this.gradProps} >
                  <stop offset="10%" stopColor="#AFC1FF" />
                  <stop offset="90%" stopColor="#4071FF" />
                </linearGradient>
                <linearGradient id="gradientId4" {...this.gradProps} >
                  <stop offset="0%" stopColor="#D7F0A0" />
                  <stop offset="75%" stopColor="#78CC0E" />
                </linearGradient>
              </defs>
              
            </svg>
          </div>
          <ResponsiveCirclePacking
             data={this.data}
             margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
             id="name"
             colors={['url(#gradientId1)', 'url(#gradientId2)', 'url(#gradientId3)', 'url(#gradientId4)']}
             colorBy="id"
             childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
             padding={1}
             leavesOnly={true}
             enableLabels={true}
             label="value"
             labelTextColor="#ffffff"
             borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
             animate={false}
             theme={{
              "fontSize": 52,
             }}
          />
        </div>
      );
    }
  }
export default LocationChart;