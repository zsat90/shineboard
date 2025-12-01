import React from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from '../navigation/RootNavigator';

// Temporary: silence React 19 + React Native Animated warning
LogBox.ignoreLogs(['useInsertionEffect must not schedule updates']);

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
