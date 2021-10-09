import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import koKR from 'antd/es/locale/ko_KR';
import { RecoilRoot } from 'recoil';

import 'moment/locale/ko';
import './App.css';

import Router from './routes/Router';

const App = () => {
  return (
    <div id="app">
      <Router />
    </div>
  );
};

export const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={koKR}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ConfigProvider>
  </QueryClientProvider>
);

export default Root;
