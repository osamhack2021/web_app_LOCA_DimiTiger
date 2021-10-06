import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';

export type CardProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

class Card extends React.Component<CardProps> {
  render() {
    return (
      <View style={[styles.container, styleShadow, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default Animated.createAnimatedComponent(Card);
