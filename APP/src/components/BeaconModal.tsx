import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';

import Pin from '@images/pin.svg';

import Button from './Button';
import LocationIcon from './LocationIcon';

import { beaconState } from '@/atoms';
import * as colors from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import Beacon from '@/types/Beacon';

const { colorCancelButton, colorModalBackground, colorWhite, colorBlack } =
  colors;

type BeaconModalProps = {
  visible?: boolean;
};

const BeaconModal = ({ visible }: BeaconModalProps) => {
  const activeBeacons = useRecoilValue(beaconState);
  const [selection, setSelection] = useState(0);
  return (
    <>
      {!visible && (
        <View style={styles.background}>
          <View style={styles.container}>
            <Pin />
            <Text style={styles.titleText}>위치가 탐지되었습니다.</Text>
            <FlatList
              data={activeBeacons}
              renderItem={({
                item: beacon,
                index,
              }: {
                item: Beacon;
                index: number;
              }) => (
                <TouchableOpacity
                  onPress={() => setSelection(index)}
                  style={styles.locationItem}>
                  <LocationIcon
                    icon={beacon.location.ui.icon}
                    width="30"
                    height="30"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationText}>
                    {beacon.location.name}
                  </Text>
                  <Text
                    style={[
                      styles.distanceText,
                      { color: colors[`color${beacon.location.ui.color}Text`] },
                    ]}>
                    20m
                  </Text>
                  <Icon
                    name="checkbox-marked-circle"
                    color={
                      selection === index
                        ? colors[`color${beacon.location.ui.color}Text`]
                        : colorWhite
                    }
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styleDivider} />}
              style={styles.locationList}
            />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.cancelButton}
                textStyle={styles.cancelButtonText}>
                취소
              </Button>
              <Button>변경</Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: colorModalBackground,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colorWhite,
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  titleText: {
    fontWeight: 'bold',
    margin: 20,
  },
  locationList: {
    flexGrow: 0,
    maxHeight: 150,
    width: '100%',
  },
  locationItem: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  locationIcon: {
    margin: 5,
  },
  locationText: {
    flex: 1,
    fontWeight: 'bold',
  },
  distanceText: {
    fontWeight: 'bold',
    marginEnd: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: colorCancelButton,
    marginEnd: 10,
  },
  cancelButtonText: {
    color: colorBlack,
  },
});

export default BeaconModal;
