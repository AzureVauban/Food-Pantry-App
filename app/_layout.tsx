import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors } from '@/constants/colors';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
/**
 * The `_layout.tsx` file defines the navigation layout and structure for all routes
 * at its directory level and below. In an Expo Router project, it acts like a wrapper
 * that can provide navigators (e.g. Stack, Tabs) and persistent UI (headers, footers, etc).
 *
 * All screens in the same directory as this file will render within the layout defined here.
 * This file is essential to create navigation hierarchies such as stacks or tab groups.
 */

export default function RootLayout() {
  // Load icon fonts (important for web builds where vector icon fonts may not load automatically)
  // On web, point to local copies under /assets/fonts which we copy in postbuild.
  const webFonts: Record<string, any> = Platform.OS === 'web'
    ? {
        Ionicons: { uri: '/assets/fonts/Ionicons.ttf' },
        MaterialCommunityIcons: { uri: '/assets/fonts/MaterialCommunityIcons.ttf' },
      }
    : {};

  const fontsToLoad = Platform.OS === 'web' ? webFonts : { ...Ionicons.font };
  const [fontsLoaded] = useFonts(fontsToLoad);

  useEffect(() => {
    // Prevent auto-hide while fonts are loading
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  // Fallback: don't block rendering forever if fonts fail to load on web.
  const [fontLoadTimedOut, setFontLoadTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFontLoadTimedOut(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!fontsLoaded && !fontLoadTimedOut) {
    // Wait a short moment for fonts to load to avoid missing glyphs. After timeout we render anyway.
    return null;
  }

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
          headerStyle: { backgroundColor: colors.light.primary },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen
          name="screens"
          options={
            Platform.OS !== 'web'
              ? {
                  headerShown: true,
                  gestureEnabled: true,
                  statusBarHidden: false,
                  headerBackVisible: false,
                  headerBackTitle: '',
                  headerTitle: '',
                  headerStyle: { backgroundColor: colors.light.primary },
                }
              : {}
          }
        />
      </Stack>
    </PaperProvider>
  );
}
