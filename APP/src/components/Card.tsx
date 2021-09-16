import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colorDivider, colorWhite } from '../constants/colors';
import { styleShadow } from '../constants/styles';

type CardProps = {
  title: string;
  children: React.ReactChild;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.divider} />
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleShadow,
    backgroundColor: colorWhite,
    borderRadius: 20,
    margin: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 21,
    margin: 20,
  },
  divider: {
    backgroundColor: colorDivider,
    height: 1,
    width: '100%',
  },
  contentContainer: {
    margin: 20,
  },
});

export default Card;
