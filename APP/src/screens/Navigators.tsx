import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainScreen from './MainScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
