import React from 'react';
import { useRecoilValue } from 'recoil';

import './Temperature.css';

import { useWeathers } from '@/api/weathers';
import { settingsState } from '@/atoms';

function convertValue(C: number, H: number) {
  const F = (C * 9) / 5 + 32;
  const R = H * 0.01;

  const fahrenheit =
    -42.379 +
    2.04901523 * F +
    10.14333127 * R -
    0.22475541 * F * R -
    0.0068377 * F * F -
    0.05481717 * R * R +
    0.00122874 * F * F * R +
    0.00085282 * F * R * R -
    0.00000199 * F;

  const celcius = (fahrenheit - 32) / 1.8;
  return Math.round(celcius * 10) / 10.0;
}

const Temperature = () => {
  const {
    weather: { location },
  } = useRecoilValue(settingsState);
  const { data } = useWeathers({ city: location });
  return (
    <div id="temperature" className="dash_component">
      <div id="temperature_head">
        <img src="./icons/temperature.svg" alt="temperatureIco" />
        <div id="temperature_num">
          {data && convertValue(data.temp, data.humidity)}
        </div>
      </div>
      <div id="temperature_contents">온도지수 주의</div>
    </div>
  );
};
export default Temperature;
