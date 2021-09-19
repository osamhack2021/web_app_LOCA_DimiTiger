import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { colorWhite } from '../constants/colors';
import { styleShadow } from '../constants/styles';

export type CardProps = {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  gradient?: LinearGradientProps;
  onPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  style,
  contentContainerStyle,
  gradient,
  onPress,
  children,
}) => {
  return (
    <Pressable style={[styles.container, styleShadow, style]} onPress={onPress}>
      <LinearGradient
        {...(gradient || { colors: [colorWhite, colorWhite] })}
        style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite,
    borderRadius: 20,
    margin: 20,
  },
  contentContainer: {
    borderRadius: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 21,
    margin: 20,
  },
});

export default Card;
