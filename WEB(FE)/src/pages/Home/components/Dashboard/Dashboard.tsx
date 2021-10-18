import React from 'react';
import { useRecoilState } from 'recoil';

import './Dashboard.css';

import LocationChart from '../LocationChart/LocationChart';
import TreeChart from '../LocationChart/TreeChart';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Notification from '../Notification/Notification';
import Temperature from '../Temperature/Temperature';
import Weather from '../Weather/Weather';
import Worker from '../Worker/Worker';

import { settingsState } from '@/atoms';

const Dashboard = () => {
  const [settings] = useRecoilState(settingsState);

  return (
    <div id="dashboard">
      <Notification></Notification>
      <div id="container1">
        <div id="container2">
          {settings.chartDesign ? <LocationChart /> : <TreeChart />}
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
};
export default Dashboard;
