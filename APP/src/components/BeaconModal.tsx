import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { beaconState } from '@/atoms';
import { colorWhite } from '@/constants/colors';

type BeaconModalProps = {
  visible?: boolean;
};

const BeaconModal = ({ visible }: BeaconModalProps) => {
  const activeBeacons = useRecoilValue(beaconState);
  return (
    <>
      {visible && (
        <View style={styles.background}>
          <View style={styles.container}>
            <Text>hi</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  container: {
    backgroundColor: colorWhite,
  },
});

export default BeaconModal;
