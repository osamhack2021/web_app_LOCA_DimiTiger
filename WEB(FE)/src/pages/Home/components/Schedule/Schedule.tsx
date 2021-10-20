import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { settingsState } from '@/atoms';
import LargeCard from '@/components/LargeCard';

const Schedule = () => {
  const { schedule } = useRecoilValue(settingsState);
  const date = schedule ? new Date(schedule.date) : undefined;
  return (
    <LargeCard
      title="다가오는 일정"
      style={{ flex: 1 }}
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontWeight: 900 }}>
        {schedule?.content || '일정이 없습니다.'}
      </h1>
      <Bottom>
        {date && (
          <h2 style={{ fontWeight: 200 }}>
            {format(date, 'yyyy-MM-dd')}
            {', '}
            {formatDistanceToNow(date, {
              addSuffix: true,
              locale: ko,
            })}
          </h2>
        )}
      </Bottom>
    </LargeCard>
  );
};

const Bottom = styled.div`
  margin-top: auto;
`;

export default Schedule;
