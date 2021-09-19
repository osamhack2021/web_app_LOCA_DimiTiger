import { Platform, ViewStyle } from 'react-native';
import { colorBlack, colorDivider } from './colors';

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
