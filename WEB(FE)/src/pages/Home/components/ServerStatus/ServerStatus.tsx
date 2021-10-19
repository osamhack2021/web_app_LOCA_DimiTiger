import React from 'react';
import styled from 'styled-components';

import LargeCard from '@/components/LargeCard';

const ServerStatus = () => {
  return (
    <LargeCard
      title="서버 상태"
      style={{ flex: 1 }}
      bodyStyle={{ flex: 1, display: 'flex' }}>
      <Container>흠</Container>
    </LargeCard>
  );
};

const Container = styled.div`
  margin-top: auto;
`;

export default ServerStatus;
