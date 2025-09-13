import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>FoodPantryApp</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.replace('/register')}
          accessibilityRole="button"
          accessibilityLabel="Go to register"
        >
          <Text style={styles.buttonText}>Go to Register</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.replace('/screens/home')}
          accessibilityRole="button"
          accessibilityLabel="Go to Home Screen"
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '600' },
  subtitle: { marginTop: 8, fontSize: 16, color: '#555' },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  buttonText: { color: '#555', fontSize: 16 },
});
