import React from 'react';
import { useRecoilState } from 'recoil';

import './Dashboard.css';

import EmergencyReportsCard from '../EmergencyReports/EmergencyReports';
import LocationChart from '../LocationChart/LocationChart';
import TreeChart from '../LocationChart/TreeChart';
import MilitaryDiscipline from '../MilitaryDiscipline/MilitaryDiscipline';
import Temperature from '../Temperature/Temperature';
import Weather from '../Weather/Weather';
import Worker from '../Worker/Worker';

import { settingsState } from '@/atoms';

const Dashboard = () => {
  const [settings] = useRecoilState(settingsState);

  return (
    <div id="dashboard">
      <EmergencyReportsCard></EmergencyReportsCard>
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
