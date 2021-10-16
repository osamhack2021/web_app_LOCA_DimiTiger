/**
 * @format
 */
// eslint-disable-next-line simple-import-sort/imports
import 'proxy-polyfill';
import 'react-native-gesture-handler';

import { AppRegistry, Linking } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import notifee, { EventType } from '@notifee/react-native';

import App from './src/App';
import { name as appName } from './app.json';

import backgroundMontorHandler from '@/utils/backgroundMontorHandler';

Beacons.setBackgroundMonitorHandler(backgroundMontorHandler);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;

  if (type === EventType.ACTION_PRESS && notification.id === 'enter') {
    Linking.openURL(
      `https://api.loca.kimjisub.me/link/location-log/${notification.data.location}`,
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
