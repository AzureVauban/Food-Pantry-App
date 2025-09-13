import { Stack } from 'expo-router';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
/**
 * The `_layout.tsx` file defines the navigation layout and structure for all routes
 * at its directory level and below. In an Expo Router project, it acts like a wrapper
 * that can provide navigators (e.g. Stack, Tabs) and persistent UI (headers, footers, etc).
 *
 * All screens in the same directory as this file will render within the layout defined here.
 * This file is essential to create navigation hierarchies such as stacks or tab groups.
 */

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          statusBarHidden: false,
          headerBackVisible: true,
          headerBackTitle: 'back',
          headerStyle: { backgroundColor: '#a1a1aa' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </PaperProvider>
  );
}
