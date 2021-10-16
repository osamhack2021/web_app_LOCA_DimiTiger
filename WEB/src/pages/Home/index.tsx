import React from 'react';
import { Redirect } from 'react-router';
import { useRecoilState } from 'recoil';

import { settingState } from '../../atoms';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import Dashboard from './components/Dashboard/Dashboard';

const Home = () => {
  const [settings] = useRecoilState(settingState);
  return settings.defaults.name === '' ? (
    <Redirect to="/init" />
  ) : (
    <div
      style={{
        backgroundColor: '#f2f3f5',
      }}>
      <Header></Header>
      <Dashboard></Dashboard>
      <Sidebar></Sidebar>
    </div>
  );
};

export default Home;
