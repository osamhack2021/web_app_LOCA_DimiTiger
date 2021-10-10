import React from 'react';
import {
  ActivityIndicator,
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
  spinner: {
    alignSelf: 'center',
    marginVertical: 8,
    position: 'absolute',
  },
});

export default Button;
