import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import {
  listenToPantryItems,
  addPantryItemShared,
  deletePantryItemShared,
  editPantryItemShared,
} from '@/utils/firestorePantry';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '@/utils/firebaseConfig';

type Item = {
  id: string;
  name: string;
  quantity: string;
};
//

export default function PantryScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const searchDebounceRef = useRef<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const functions = getFunctions(app);
  const searchFoods = httpsCallable(functions, 'searchFoods');
  const getfooddetails = httpsCallable(functions, 'getFoodDetails');
  

  const onChangeSearch = (text: string) => {
    setNewItemName(text);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (text.length < 3) {
      setSearchResults([]);
      return;
    }

    searchDebounceRef.current = window.setTimeout(() => {
      handleSearchFood(text);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setItems([]);
        setLoading(false);
      }
    });

    // listen to pantry items in shared pantry
    const unsubItems = listenToPantryItems(id, (pantryItems) => {
      setItems(
        pantryItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: String(item.quantity ?? ''),
        })),
      );
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubItems) unsubItems();
    };
  }, [id]);

  const handleAddItem = async () => {
    if (!newItemName.trim() || !newItemQuantity.trim() || !userId) return;

    try {
      const itemData = {
        name: newItemName.trim(),
        quantity: newItemQuantity.trim(),
      };

      await addPantryItemShared(id, itemData);

      setModalVisible(false);
      setNewItemName('');
      setNewItemQuantity('');
    } catch (err) {
      console.error('Error adding pantry item:', err);
      setError('Failed to add item');
    }
  };

  const handleSearchFood = async (query: string) => {
    setNewItemName(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await searchFoods({
        searchTerm: query,
        pageNumber: 0,
        maxResults: 20,
      });

      console.log('Search API result:', response.data);

      const data: any = await response.data;
      const results = data.foods?.food ?? [];

      setSearchResults(Array.isArray(results) ? results : [results]);
    } catch (err) {
      console.error('Error searching foods:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectFood = async (foodId: string) => {
    try {
      const response = await getfooddetails({ foodId });

      console.log('Food details result:', response.data);

      const details = response.data as any;
      setNewItemName(details.food?.food_name || '');

      const serving = Array.isArray(details.food?.servings?.serving)
        ? details.food.servings.serving[0]
        : details.food?.servings?.serving;

      const quantityText = serving
        ? `${serving.serving_description || '1 serving'} (${serving.calories || '?'} kcal)`
        : '1';
      setNewItemQuantity(quantityText);

      setSearchResults([]);
    } catch (err) {
      console.error('Error fetching food details:', err);
    }
  };

  const handleDeletedItem = async (itemId: string) => {
    await deletePantryItemShared(id, itemId);
  };

  const startEdit = (item: Item) => {
    setEditingItemId(item.id);
    setNewItemName(item.name);
    setNewItemQuantity(item.quantity);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItemId || !userId) return;
    try {
      const updated = {
        name: newItemName.trim(),
        quantity: newItemQuantity.trim(),
      };
      await editPantryItem(userId, id!, editingItemId, updated);
      setItems(items.map((it) => (it.id === editingItemId ? { ...it, ...updated } : it)));
      setModalVisible(false);
      setEditingItemId(null);
      setNewItemName('');
      setNewItemQuantity('');
    } catch (err) {
      console.error('Error editing pantry item:', err);
      setError('Failed to edit item');
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleDeletedItem(item.id)} style={styles.actionButton}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => startEdit(item)}
          style={styles.actionButton} 
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6B7280"
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={styles.empty}>{error}</Text>
      ) : items.length === 0 ? (
        <Text style={styles.empty}>This pantry is empty.</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>➕ Add Item</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Item</Text>

            <TextInput
              style={styles.input}
              placeholder="Search Food"
              value={newItemName}
              //onChangeText={setNewItemName}
              onChangeText={onChangeSearch}
            />
            {searchLoading && (
              <ActivityIndicator
                size="small"
                color="#6B7280"
                style={{ marginVertical: 10 }}
              />
            )}
            <FlatList
              style={{ maxHeight: 200 }}
              data={searchResults}
              //keyExtractor={(item) => item.food_id}
              keyExtractor={(item) => String(item.food_id ?? item.id ?? '')}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchItem}
                  onPress={() => handleSelectFood(item.food_id)}
                >
                  <Text style={{ fontWeight: '600' }}>{item.food_name}</Text>
                  {item.brand_name && (
                    <Text style={{ color: '#6B7280' }}>{item.brand_name}</Text>
                  )}
                  {item.food_description && (
                    <Text style={{ color: '#9CA3AF', fontSize: 12 }}>
                      {item.food_description.split(' | ')[0]}{' '}
                      {/* usually has "Calories: 89 kcal | Fat: 0.3g ..." */}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity (e.g., 2 cans)"
              value={newItemQuantity}
              onChangeText={setNewItemQuantity}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#6B7280' }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditingItemId(null);
                  setNewItemName('');
                  setNewItemQuantity('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#2563EB' }]}
                onPress={editingItemId ? handleSaveEdit : handleAddItem}
              >
                <Text style={styles.modalButtonText}>{editingItemId ? 'Save' : 'Add'}</Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#111827' },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  itemName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  itemQuantity: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  itemActions: { flexDirection: 'row', gap: 12 },
  actionButton: { padding: 4 },
  deleteButtonText: { fontSize: 20, color: '#EF4444' },
  editButtonText: { fontSize: 20, color: '#2563EB' },
  empty: { textAlign: 'center', marginTop: 40, color: '#6B7280' },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: '#F9FAFB' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontWeight: '600' },
  searchItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
});