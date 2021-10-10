import React, { Component } from 'react';

import './PersonnelStatus.css';

class PersonnelStatus extends Component {
  render() {
    return (
      <div id="personnelStatus" className="dash_component">
        <div className="headline">
          <h1>인원 현황</h1>
        </div>
        <div className="status">
          <div className="status_content">
            <div>총원</div>
            <div>46</div>
          </div>
          <div className="status_content">
            <div>현재원</div>
            <div>39</div>
          </div>
          <div className="status_content">
            <div>결원</div>
            <div>7</div>
          </div>
          <div className="empty_people">
            <div>휴가</div>
            <div>6</div>
          </div>
          <div className="empty_people">
            <div>입실</div>
            <div>1</div>
          </div>
        </div>
      </div>
    );
  }
}
export default PersonnelStatus;
