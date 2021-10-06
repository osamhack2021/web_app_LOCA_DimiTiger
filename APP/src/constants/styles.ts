import { Platform, TextStyle, ViewStyle } from 'react-native';

import {
  colorBlack,
  colorButton,
  colorDivider,
  colorTextInput,
} from '@/constants/colors';

export const styleShadow: ViewStyle = {
  ...Platform.select({
    android: {
      elevation: 10,
    },
    default: {
      shadowColor: colorBlack,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  }),
};

export const styleDivider: ViewStyle = {
  backgroundColor: colorDivider,
  height: 1,
  width: '100%',
};

export const styleTextInput: TextStyle = {
  backgroundColor: colorTextInput,
  borderRadius: 5,
  borderWidth: 2,
  fontSize: 16,
  fontWeight: 'bold',
  marginHorizontal: 20,
  padding: 10,
};

export const styleTextInputFocus: TextStyle = {
  borderColor: colorButton,
};

export const styleTextInputBlur: TextStyle = {
  borderColor: colorTextInput,
};
