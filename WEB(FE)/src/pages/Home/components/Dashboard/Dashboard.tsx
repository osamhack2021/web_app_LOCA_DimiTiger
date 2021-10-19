import React from 'react';
import { Col, Row } from 'antd';

import './Dashboard.css';

import LocationChart from '../LocationChart/LocationChart';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Notification from '../Notification/Notification';
import ServerStatus from '../ServerStatus/ServerStatus';
import Temperature from '../Temperature/Temperature';
import Weather from '../Weather/Weather';

const Dashboard = () => {
  return (
    <Row gutter={[32, 32]} id="dashboard">
      <Col xs={{ span: 24, order: 2 }} xxl={{ span: 6, order: 1 }}>
        <Notification />
      </Col>
      <Col xs={{ span: 24, order: 1 }} xxl={{ span: 18, order: 2 }}>
        <LocationChart />
        <Row gutter={[0, 32]} id="bottomComponents">
          <Col
            xs={24}
            lg={16}
            style={{ display: 'flex', flexDirection: 'row' }}>
            <Weather />
            <Temperature />
            <MilitaryDiscipline />
          </Col>
          <Col xs={0} lg={8}>
            <ServerStatus />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Dashboard;
