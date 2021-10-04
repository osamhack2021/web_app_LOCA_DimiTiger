import React, { useMemo, useState } from 'react';
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

import { useLogLocation } from '@/api/location-logs';
import { beaconState } from '@/atoms';
import * as colors from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import Beacon from '@/types/Beacon';

const { colorCancelButton, colorModalBackground, colorWhite, colorBlack } =
  colors;

type BeaconModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const BeaconModal = ({ visible, setVisible }: BeaconModalProps) => {
  const activeBeacons = useRecoilValue(beaconState);
  const beacons = useMemo(() => activeBeacons, [activeBeacons]);
  const [selection, setSelection] = useState(0);
  const logLocation = useLogLocation();
  return (
    <>
      {visible && (
        <View style={styles.background}>
          <View style={styles.container}>
            <Pin />
            <Text style={styles.titleText}>위치가 탐지되었습니다.</Text>
            <FlatList
              data={beacons}
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
                    {`${Math.round(beacon.region?.distance || Infinity)}m`}
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
                onPress={() => setVisible(false)}
                style={styles.cancelButton}
                textStyle={styles.cancelButtonText}>
                취소
              </Button>
              <Button
                onPress={async () => {
                  await logLocation.mutateAsync(
                    activeBeacons[selection].location._id,
                  );
                  setVisible(false);
                }}>
                변경
              </Button>
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
