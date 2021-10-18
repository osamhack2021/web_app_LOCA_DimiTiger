import React from 'react';
import { useRecoilValue } from 'recoil';

import './Weather.css';

import { useWeathers } from '@/api/weathers';
import { settingsState } from '@/atoms';

const Weather = () => {
  const { weather } = useRecoilValue(settingsState);
  const weathers = useWeathers({ city: weather.location });
  return (
    <div id="weather" className="dash_component">
      <div id="weather_head">
        <img src="./icons/weather.svg" alt="weatherIco" />
        <div id="weather_num">{Math.floor(weathers.data?.temp)}</div>
      </div>
      <div id="weather_contents">{weathers.data?.description}</div>
    </div>
  );
};
export default Weather;
