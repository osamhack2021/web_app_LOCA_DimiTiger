import { Platform, ViewStyle } from 'react-native';
import { colorBlack } from './colors';

export const styleShadow: ViewStyle = {
  ...Platform.select({
    android: {
      elevation: 10,
    },
    default: {
      shadowColor: colorBlack,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
    },
  }),
};
