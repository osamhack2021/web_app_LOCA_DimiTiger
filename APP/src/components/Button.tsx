import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colorButton, colorWhite } from '../constants/colors';
import { styleShadow } from '../constants/styles';

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  children: string;
};

const Button: React.FC<ButtonProps> = ({ style, onPress, children }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
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
    color: colorWhite,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default Button;
