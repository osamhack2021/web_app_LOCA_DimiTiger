import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';

export type CardProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ style, children }) => {
  return <View style={[styles.container, styleShadow, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default Card;
