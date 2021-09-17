import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { colorWhite } from '../constants/colors';
import { styleDivider, styleShadow } from '../constants/styles';

type CardProps = {
  title?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  gradient?: LinearGradientProps;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  style,
  contentContainerStyle,
  gradient,
  children,
}) => {
  return (
    <View style={styleShadow}>
      <LinearGradient
        {...(gradient || { colors: [colorWhite, colorWhite] })}
        style={[styles.container, style]}>
        {title && (
          <>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styleDivider} />
          </>
        )}
        <View style={contentContainerStyle}>{children}</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite,
    borderRadius: 20,
    margin: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 21,
    margin: 20,
  },
  contentContainer: {
    margin: 20,
  },
});

export default Card;
