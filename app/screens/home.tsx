import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { createPantry, getPantries } from '@/utils/firestorePantry';
import { getAuth,onAuthStateChanged,signOut} from 'firebase/auth';


type Pantry = {
  id: string;
  name: string;
};

export default function Home() {
  // const userId = 'user_3fi4yhwj'; // Placeholder user ID for demonstration

  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [pantries, setPantries] = useState<Pantry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPantryName, setNewPantryName] = useState('');
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName || 'User');
      }else{
        router.replace('/login');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function fetchPantries() {
      if (!userId) return;
      try {
        const fetched = await getPantries(userId);
        setPantries(fetched);
      } catch (err) {
        console.error('Error fetching pantries:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPantries();
  }, [userId]);

  const addPantry = async () => {
    if (!newPantryName.trim() || !userId) return;
    try {
      const pantryId = await createPantry(userId, newPantryName.trim());
      setPantries([...pantries, { id: pantryId, name: newPantryName.trim() }]);
      setNewPantryName('');
      setModalVisible(false);
    } catch (err) {
      console.error('Error adding pantry:', err);
    }
  };

  const handleLogout = () => {
    try {
      signOut(auth);
      router.replace('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const renderPantry = ({ item }: { item: Pantry }) => (
    <Link
      href={{
        pathname: '/pantryview',
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

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : pantries.length === 0 ? (
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

      {/* Add Pantry Modal */}
      <Modal
        transparent
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  pantryCard: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  pantryText: { fontSize: 16, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 20, color: '#9CA3AF' },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },
});