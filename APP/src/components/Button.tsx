import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Text from '@/components/Text';
import { colorButton, colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  children: string;
};

const Button = ({ style, textStyle, onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
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
