import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { App } from './src';

export default function () {
  return (
    <SafeAreaProvider>
      <App />
      <StatusBar />
    </SafeAreaProvider>
  );
}
