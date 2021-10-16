import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilState } from 'recoil';

import './Header.css';

import { settingState } from '../../atoms';

const Header = () => {
  const [date, setDate] = useState(new Date());
  const [setting] = useRecoilState(settingState);

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
              'https://api.loca.kimjisub.me/static/uploads/' +
              setting.defaults.icon
            }
            alt="logo"
          />
          <p className="belong_name">
            {setting.defaults.name
              ? setting.defaults.name.indexOf(' ') !== -1
                ? setting.defaults.name.split(' ')[0] + ' '
                : setting.defaults.name
              : ''}
            {
              <span>
                {setting.defaults.name
                  ? setting.defaults.name.indexOf(' ') !== -1
                    ? setting.defaults.name.split(' ')[1]
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
