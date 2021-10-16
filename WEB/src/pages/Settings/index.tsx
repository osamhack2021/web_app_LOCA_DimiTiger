import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Information from './components/Information';
import MilitaryDiscipline from './components/MilitaryDiscipline';
import Opensource from './components/OpenSource';
import Team from './components/Team';
import Weather from './components/Weather';

import Header from '@/components/Header/Header';
import LargeCard from '@/components/LargeCard';
import LayoutContent from '@/components/LayoutContent';
import LayoutContentWrapper from '@/components/LayoutContentWrapper';
import Sidebar from '@/components/Sidebar/Sidebar';
const Settings = () => {
  const history = useHistory();
  const [tab, setTab] = useState(1);

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <LargeCard
          title="설정"
          history={history}
          bodyStyle={{
            padding: '0',
            height: 'calc(100vh - 6vw - 170px)',
            display: 'flex',
          }}>
          <LayoutSidebar>
            <SiderbarItem
              className={tab === 1 ? 'selected' : ''}
              onClick={() => setTab(1)}>
              부대기본 설정
            </SiderbarItem>
            <SiderbarItem
              className={tab === 2 ? 'selected' : ''}
              onClick={() => setTab(2)}>
              날씨 설정
            </SiderbarItem>
            <SiderbarItem
              className={tab === 3 ? 'selected' : ''}
              onClick={() => setTab(3)}>
              군기강 확립 작전
            </SiderbarItem>
            <SiderbarItem
              className={tab === 4 ? 'selected' : ''}
              onClick={() => setTab(4)}>
              오픈소스 정보
            </SiderbarItem>
            <SiderbarItem
              className={tab === 5 ? 'selected' : ''}
              onClick={() => setTab(5)}>
              팀 DimiTiger
            </SiderbarItem>
          </LayoutSidebar>
          <LayoutContentContainer>
            {tab === 1 ? (
              <Information></Information>
            ) : tab === 2 ? (
              <Weather></Weather>
            ) : tab === 3 ? (
              <MilitaryDiscipline></MilitaryDiscipline>
            ) : tab === 4 ? (
              <Opensource></Opensource>
            ) : tab === 5 ? (
              <Team></Team>
            ) : (
              ''
            )}
          </LayoutContentContainer>
        </LargeCard>
      </LayoutContent>
      <Sidebar />
    </LayoutContentWrapper>
  );
};

const LayoutSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100%;
  background-color: #313545;
  border-bottom-left-radius: 20px;
`;
const SiderbarItem = styled.div`
  width: 100%;
  padding: 18px 26px;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #20232f;
  }
  &.selected {
    background-color: #20232f;
  }
`;
const LayoutContentContainer = styled.div`
  width: calc(80vw - 284px);
  height: 100%;
`;

export default Settings;
