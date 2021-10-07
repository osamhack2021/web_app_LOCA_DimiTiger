import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

import {
  styleNanumBarunGothic,
  styleNanumBarunGothicBold,
} from '@/constants/styles';

const Text = (props: PropsWithChildren<TextProps>) => {
  const { style, ...rest } = props;
  const { fontWeight } = StyleSheet.flatten(style);
  return (
    <RNText
      style={[
        fontWeight === 'bold'
          ? styleNanumBarunGothicBold
          : styleNanumBarunGothic,
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;
