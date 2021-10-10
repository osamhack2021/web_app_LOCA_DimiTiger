/**
 * @format
 */
// eslint-disable-next-line simple-import-sort/imports
import 'proxy-polyfill';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import App from './src/App';
import { name as appName } from './app.json';

import backgroundMontorHandler from '@/utils/backgroundMontorHandler';

Beacons.setBackgroundMonitorHandler(backgroundMontorHandler);

AppRegistry.registerComponent(appName, () => App);
