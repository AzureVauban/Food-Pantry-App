import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>FoodPantryApp</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.replace('../login')}
          accessibilityRole="button"
          accessibilityLabel="Logout"
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '600' },
  subtitle: { marginTop: 8, fontSize: 16 },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.light.primary,
    borderRadius: 8,
  },
  buttonText: { color: 'black', fontSize: 16 },
});
