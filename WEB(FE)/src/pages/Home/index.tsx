import React from 'react';
import { Redirect } from 'react-router';
import { useRecoilValue } from 'recoil';

import Dashboard from './components/Dashboard/Dashboard';

import { settingsState } from '@/atoms';
import Header from '@/components/Header/Header';
import LayoutContentWrapper from '@/components/LayoutContentWrapper';
import Sidebar from '@/components/Sidebar/Sidebar';

const Home = () => {
  const settings = useRecoilValue(settingsState);
  return !settings ||
    !settings.information ||
    settings.information.name === '' ? (
    <Redirect to="/init" />
  ) : (
    <LayoutContentWrapper>
      <Header />
      <Dashboard></Dashboard>
      <Sidebar />
    </LayoutContentWrapper>
  );
};

export default Home;
