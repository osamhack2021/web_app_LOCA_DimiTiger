import React from 'react';
import { differenceInDays } from 'date-fns';
import { useRecoilValue } from 'recoil';

import './MilitaryDiscipline.css';

import { settingsState } from '@/atoms';

const MilitaryDiscipline = () => {
  const { militaryDiscipline } = useRecoilValue(settingsState);
  return (
    <div id="militaryDiscipline" className="dash_component">
      <div id="militaryDiscipline_head">군기강 확립</div>
      <div id="militaryDiscipline_contents">
        <span>
          {differenceInDays(new Date(), new Date(militaryDiscipline)) + 1}
        </span>
        일
      </div>
    </div>
  );
};
export default MilitaryDiscipline;
