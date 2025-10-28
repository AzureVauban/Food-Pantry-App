import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import MySearch from '../components/Searchbar';
export default function Recipes() {
  return (
    <SafeAreaView style={styles.container}>
      <MySearch />
      <View style={styles.center}>
        <Text style={styles.title}>Recipes</Text>
        <Text style={styles.subtitle}>FoodPantryApp</Text>
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
  subtitle: { marginTop: 8, fontSize: 16 },
});
