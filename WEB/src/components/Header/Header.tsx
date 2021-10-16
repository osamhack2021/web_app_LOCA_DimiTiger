import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';

import './Header.css';

import { settingsState } from '@/atoms';

const Header = () => {
  const [date, setDate] = useState(new Date());
  const { information } = useRecoilValue(settingsState);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div id="belong">
        <Link
          to="/"
          style={{
            display: 'flex',
          }}>
          <img
            id="belong_logo"
            src={
              'https://api.loca.kimjisub.me/static/uploads/' + information.icon
            }
            alt="logo"
          />
          <p className="belong_name">
            {information.name
              ? information.name.indexOf(' ') !== -1
                ? information.name.split(' ')[0] + ' '
                : information.name
              : ''}
            {
              <span>
                {information.name
                  ? information.name.indexOf(' ') !== -1
                    ? information.name.split(' ')[1]
                    : ''
                  : ''}
              </span>
            }
          </p>
        </Link>
      </div>
      <div id="watch_widget">
        <div className="vertical_line"></div>
        <div className="watch">
          <div className="date">
            {format(date, 'yyyy-MM-dd EEEE', { locale: ko })}
          </div>
          <div className="time">
            {format(date, 'HH:mm')}
            <div className="seconds">{format(date, 'ss')}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
