import React from 'react';
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
    <div id="dashboard">
      <Notification></Notification>
      <div id="container1">
        <div id="container2">
          {settings.chartDesign === 'circlepacking' ? (
            <CirclePackingChart />
          ) : (
            <TreeMapChart />
          )}
        </div>
        <div id="container3">
          <Weather></Weather>
          <Temperature></Temperature>
          <MilitaryDiscipline></MilitaryDiscipline>
          <ServerStatus></ServerStatus>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
