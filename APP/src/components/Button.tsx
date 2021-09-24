import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colorButton, colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  children: string;
};

const Button = ({ style, onPress, children }: ButtonProps) => {
  return (
    <Animated.View>
      <Pressable style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleShadow,
    backgroundColor: colorButton,
    borderRadius: 10,
    shadowColor: colorButton,
    shadowOpacity: 0.2,
  },
  text: {
    alignSelf: 'center',
    color: colorWhite,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default Button;
