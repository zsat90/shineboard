import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import KidProfileScreen from '../screens/KidProfileScreen';
import AddKidScreen from '../screens/AddKidScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Profile: { kidId: string };
  Stars: undefined;
  Add: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: true, headerLeft: () => null }} />
      <Stack.Screen name="Add" component={AddKidScreen} options={{ headerShown: true, headerLeft: () => null }} />
      <Stack.Screen name="Profile" component={KidProfileScreen} options={{ headerShown: true, headerLeft: () => null }} />
    </Stack.Navigator>
  );
}
