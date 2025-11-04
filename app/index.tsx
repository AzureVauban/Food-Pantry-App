import { useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The `index.tsx` file is the main entry point for a React Native (Expo) app using Expo Router.
 * It is required to render the root layout stack or slot navigator.
 * This file ensures your app has a valid navigation hierarchy and is the first point of rendering.
 *
 * Without this file, Expo Router may fail to load the layout correctly,
 * especially if no default screen is defined in the root of the app directory.
 */

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    console.log('[INDEX] Redirecting to Welcome screen');

    //! Add a small delay to ensure the Root Layout has finished mounting
    const timer = setTimeout(() => {
      if (Platform.OS === 'web') {
        router.replace('/login');
      } else {
        router.replace('/welcome');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>INDEX.TSX</Text>
      </View>
    </SafeAreaView>
  );
}
