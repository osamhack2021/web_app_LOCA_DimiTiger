import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { useRecoilState } from 'recoil';

import { settingsState } from '@/atoms';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { styleDivider } from '@/constants/styles';

const PreferenceCard = () => {
  const [settings, setSettings] = useRecoilState(settingsState);
  return (
    <Card>
      <Text style={styles.titleText}>위치 탐색 설정</Text>
      <View style={styleDivider} />
      <View style={styles.contentContainer}>
        <View style={styles.switchContainer}>
          <Text>백그라운드 탐지 알림</Text>
          <Switch
            value={settings.backgroundScanEnabled}
            onValueChange={value =>
              setSettings({ backgroundScanEnabled: value })
            }
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 20,
  },
  contentContainer: {
    padding: 20,
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PreferenceCard;
