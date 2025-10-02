import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { firestorePantry } from 'utils/firebaseConfig';

type Item = {
  id: string;
  name: string;
  quantity: string;
};

export default function PantryScreen() {
  const { name } = useLocalSearchParams<{ id: string; name: string }>();

  const [items] = useState<Item[]>([
    { id: '1', name: 'Sample Item', quantity: '1 pc' },
  ]);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>This pantry is empty.</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  itemCard: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemQuantity: { fontSize: 14, color: '#6B7280' },
  empty: { textAlign: 'center', marginTop: 20, color: '#9CA3AF' },
});
