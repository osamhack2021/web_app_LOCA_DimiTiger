import React from 'react';
import {
<<<<<<< HEAD
=======
  ActivityIndicator,
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
  children: string;
};

const Button = ({ style, textStyle, onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
=======
  loading?: boolean;
  children: string;
};

const Button = ({
  style,
  textStyle,
  onPress,
  loading,
  children,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={!loading ? onPress : undefined}>
      <Text style={[styles.text, textStyle, loading && { color: colorButton }]}>
        {children}
      </Text>
      {loading && (
        <ActivityIndicator color={colorWhite} style={styles.spinner} />
      )}
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======
  spinner: {
    alignSelf: 'center',
    marginVertical: 8,
    position: 'absolute',
  },
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
});

export default Button;
