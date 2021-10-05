/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import notifee from '@notifee/react-native';

import App from './src/App';
import { name as appName } from './app.json';

Beacons.setBackgroundMonitorHandler(async ({ state }) => {
  const isEnter = state === 'inside';
  const channelId = await notifee.createChannel({
    id: isEnter ? 'enter' : 'exit',
    name: `LOCA 위치 ${isEnter ? '입' : '퇴'}장 알림`,
  });

  await notifee.displayNotification({
    title: '위치 출입 탐지',
    body: '위치 출입이 탐지되었습니다.',
    android: {
      channelId,
    },
    ios: {},
  });
});

AppRegistry.registerComponent(appName, () => App);
