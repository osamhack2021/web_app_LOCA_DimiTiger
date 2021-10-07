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
    name: `LOCA 위치 ${isEnter ? '진입' : '이탈'} 알림`,
  });

  await notifee.displayNotification({
    title: '위치 탐지 알림',
    body: `${beacon.location.name}에${isEnter ? ' 진입' : '서 이탈'}했습니다.`,
    android: {
      channelId,
    },
    ios: {},
  });
}
