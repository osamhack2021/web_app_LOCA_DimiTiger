import { BackgroundMonitorEvent } from 'react-native-beacons-manager';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Beacon from '@/types/Beacon';

export default async function ({ identifier, state }: BackgroundMonitorEvent) {
  const beaconsJSON = await AsyncStorage.getItem('beacons');
  const beacons: Beacon[] = JSON.parse(beaconsJSON || '[]');
  const beacon = beacons.find(b => b.region.identifier === identifier);

  if (!beacon) {
    return;
  }

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
}
