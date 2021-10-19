import React from 'react';
import { Col, Row } from 'antd';
import { useRecoilState } from 'recoil';

import './Dashboard.css';

import CirclePackingChart from '../LocationChart/CirclePackingChart';
import TreeMapChart from '../LocationChart/TreeMapChart';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Notification from '../Notification/Notification';
import ServerStatus from '../ServerStatus/ServerStatus';
import Temperature from '../Temperature/Temperature';
import Weather from '../Weather/Weather';

import { settingsState } from '@/atoms';

const Dashboard = () => {
  const [settings] = useRecoilState(settingsState);

  return (
    <Row gutter={[32, 32]} id="dashboard">
      <Col xs={24} xxl={6}>
        <Notification />
      </Col>
      <Col xs={24} xxl={18}>
        {settings.chartDesign === 'circlepacking' ? (
          <CirclePackingChart />
        ) : (
          <TreeMapChart />
        )}
        <div id="container3">
          <Weather></Weather>
          <Temperature></Temperature>
          <MilitaryDiscipline></MilitaryDiscipline>
          <ServerStatus></ServerStatus>
        </div>
      </Col>
    </Row>
  );
};
export default Dashboard;
