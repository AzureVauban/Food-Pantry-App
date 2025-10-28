import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

type Pantry = {
  id: string;
  name: string;
};

export default function Home() {
  const [pantries, setPantries] = useState<Pantry[]>([
    { id: '1', name: 'Pantry 1' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPantryName, setNewPantryName] = useState('');

  const addPantry = () => {
    if (!newPantryName.trim()) return;
    const newId = String(Date.now());
    setPantries([...pantries, { id: newId, name: newPantryName.trim() }]);
    setNewPantryName('');
    setModalVisible(false);
  };

  const renderPantry = ({ item }: { item: Pantry }) => (
    <Link
      href={{
        pathname: '/screens/pantry',
        params: { id: item.id, name: item.name },
      }}
      asChild
    >
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>➕ Add Pantry</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Name your pantry</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pantry name"
              value={newPantryName}
              onChangeText={setNewPantryName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#6B7280' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#2563EB' }]}
                onPress={addPantry}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },
});
