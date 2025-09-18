import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

type Pantry = {
  id: string;
  name: string;
};

export default function Home() {
  const [pantries, setPantries] = useState<Pantry[]>([
    { id: "1", name: "Pantry 1" },
  ]);

  const addPantry = () => {
    const newId = String(Date.now());
    const newPantry: Pantry = { id: newId, name: `Pantry ${pantries.length + 1}` };
    setPantries([...pantries, newPantry]);
    Alert.alert("New Pantry Added", `Created ${newPantry.name}`);
  };

  const renderPantry = ({ item }: { item: Pantry }) => (
    <Link href={{ pathname: "/screens/pantry", params: { id: item.id, name: item.name } }} asChild>
      <TouchableOpacity style={styles.pantryCard}>
        <Text style={styles.pantryText}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Pantries</Text>

      {pantries.length === 0 ? (
        <Text style={styles.empty}>No pantries yet. Add one below!</Text>
      ) : (
        <FlatList
          data={pantries}
          renderItem={renderPantry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addPantry}>
        <Text style={styles.addButtonText}>➕ Add Pantry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  pantryCard: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  pantryText: { fontSize: 16, fontWeight: "600" },
  empty: { textAlign: "center", marginTop: 20, color: "#9CA3AF" },
  addButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
