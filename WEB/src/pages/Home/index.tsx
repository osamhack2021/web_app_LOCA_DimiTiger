import React from 'react';
import { Redirect } from 'react-router';
import { useRecoilValue } from 'recoil';

import { settingsState } from '../../atoms';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import Dashboard from './components/Dashboard/Dashboard';

const Home = () => {
  const { information } = useRecoilValue(settingsState);
  return !information || information.name === '' ? (
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
