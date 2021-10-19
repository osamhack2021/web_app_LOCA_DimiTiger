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
      <Col xs={{ span: 24, order: 2 }} xxl={{ span: 6, order: 1 }}>
        <Notification />
      </Col>
      <Col xs={{ span: 24, order: 1 }} xxl={{ span: 18, order: 2 }}>
        {settings.chartDesign === 'circlepacking' ? (
          <CirclePackingChart />
        ) : (
          <TreeMapChart />
        )}
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
