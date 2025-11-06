import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import GroceryPDFView from './groceryPDFView';

type GroceryItemType = { name: string; quantity: number; purchased: boolean };
type GroceryListType = { title: string; items: GroceryItemType[] };

export default function Grocery() {
  const [lists, setLists] = useState<GroceryListType[]>([]);
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(null);
  const [newListTitle, setNewListTitle] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const pdfRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedLists = localStorage.getItem('groceryLists');
    if (storedLists) setLists(JSON.parse(storedLists));
  }, []);

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem('groceryLists', JSON.stringify(lists));
  }, [lists]);

  const addList = () => {
    if (!newListTitle.trim()) return;
    setLists([...lists, { title: newListTitle.trim(), items: [] }]);
    setNewListTitle('');
  };

  const deleteList = (index: number) => {
    const updatedLists = [...lists];
    updatedLists.splice(index, 1);
    setLists(updatedLists);
  };


  const addItem = () => {
    if (selectedListIndex === null || !newItemName.trim()) return;
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items.push({ name: newItemName.trim(), quantity: 1, purchased: false });
    setLists(updatedLists);
    setNewItemName('');
  };

  const togglePurchased = (itemIndex: number) => {
    if (selectedListIndex === null) return;
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items[itemIndex].purchased =
      !updatedLists[selectedListIndex].items[itemIndex].purchased;
    setLists(updatedLists);
  };

  const removeItem = (itemIndex: number) => {
    if (selectedListIndex === null) return;
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items.splice(itemIndex, 1);
    setLists(updatedLists);
  };

  const adjustQuantity = (itemIndex: number, delta: number) => {
    if (selectedListIndex === null) return;
    const updatedLists = [...lists];
    const item = updatedLists[selectedListIndex].items[itemIndex];
    item.quantity = Math.max(1, item.quantity + delta);
    setLists(updatedLists);
  };

// --- Generate printable view ---
  const downloadPDF = () => {
    if (selectedListIndex === null) return;
    const printable = pdfRef.current?.outerHTML;
    if (!printable) return;

  const newWin = window.open('', '_blank');
  if (!newWin) return;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Grocery List</title>
        <style>
          body { margin: 20px; font-family: sans-serif; color: ${colors.dark.vibrantAccent}; }
          h1 { text-align: center; color: ${colors.dark.vibrantAccent}; }
          li { margin: 4px 0; display: flex; justify-content: space-between; }
          .quantity { color: green; font-weight: bold; margin-left: 8px; }
          @page { margin: 0; } /* remove headers/footers in browsers that support it */
        </style>
      </head>
      <body>
        ${printable}
      </body>
    </html>
  `;

  newWin.document.open();
  newWin.document.write(html);
  newWin.document.close();
  newWin.focus();
  newWin.print();
};



  const renderItem = ({ item, index }: { item: GroceryItemType; index: number }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => togglePurchased(index)} style={styles.checkbox}>
        <View style={[styles.checkboxInner, item.purchased && styles.checkboxChecked]} />
      </TouchableOpacity>
      <Text style={[styles.itemText, item.purchased && styles.itemPurchased]}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => adjustQuantity(index, -1)}>
          <Ionicons name="remove-circle-outline" size={24} color={colors.dark.vibrantAccent} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => adjustQuantity(index, 1)}>
          <Ionicons name="add-circle-outline" size={24} color={colors.dark.vibrantAccent} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(index)}>
        <Ionicons name="trash-outline" size={24} color={colors.dark.vibrantAccent} />
      </TouchableOpacity>
    </View>
  );

  // --- All Lists View ---
  if (selectedListIndex === null) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
        <Text style={styles.title}>My Grocery Lists</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={newListTitle}
            onChangeText={setNewListTitle}
            placeholder="New list title"
            placeholderTextColor={colors.dark.vibrantAccent + '80'}
            style={styles.input}
          />
          <TouchableOpacity onPress={addList} style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={28} color={colors.dark.vibrantAccent} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {lists.map((list, index) => (
            <View key={index} style={styles.listCard}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setSelectedListIndex(index)}
              >
                <Text style={styles.listButtonText}>{list.title}</Text>
                <Text style={styles.listItemCount}>{list.items.length} items</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteList(index)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={22} color={colors.dark.vibrantAccent} />
              </TouchableOpacity>
          </View>
            ))}
          </View>

      </SafeAreaView>
    );
  }

  // --- Single List View ---
  const selectedList = lists[selectedListIndex];
  const remainingItems = selectedList.items.filter(item => !item.purchased).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => setSelectedListIndex(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.itemCounter}>{remainingItems} items left</Text>
      </View>

      <Text style={styles.title}>{selectedList.title}</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={newItemName}
          onChangeText={setNewItemName}
          placeholder="Add new item"
          placeholderTextColor={colors.dark.vibrantAccent + '80'}
          style={styles.input}
        />
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color={colors.dark.vibrantAccent} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedList.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity onPress={downloadPDF} style={styles.pdfButton}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Download PDF</Text>
      </TouchableOpacity>

      <div style={{ display: 'none' }}>
        <GroceryPDFView ref={pdfRef} listTitle={selectedList.title} items={selectedList.items} />
      </div>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.dark.vibrantAccent,
    textAlign: 'center',
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'center' },
  input: {
    flex: 1,
    borderColor: colors.dark.vibrantAccent,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    color: colors.dark.vibrantAccent,
  },
  addButton: { padding: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  listButton: {
    width: '48%',
    backgroundColor: colors.dark.primary + '20',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  listButtonText: { fontSize: 20, color: colors.dark.vibrantAccent, marginBottom: 4 },
  listItemCount: { fontSize: 14, color: colors.dark.vibrantAccent + '80' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.dark.vibrantAccent + '30',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.dark.vibrantAccent,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: { width: 16, height: 16, backgroundColor: 'transparent' },
  checkboxChecked: { backgroundColor: colors.dark.vibrantAccent },
  itemText: { flex: 1, fontSize: 18, color: colors.dark.vibrantAccent },
  itemPurchased: { textDecorationLine: 'line-through', color: colors.dark.vibrantAccent + '80' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  quantityText: { marginHorizontal: 8, fontSize: 16, color: colors.dark.vibrantAccent },
  backButton: {
    borderWidth: 1,
    borderColor: colors.dark.vibrantAccent,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backButtonText: {
    color: colors.dark.vibrantAccent,
    fontWeight: '600',
  },
  itemCounter: { fontSize: 16, color: colors.dark.vibrantAccent },
  pdfButton: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: colors.dark.vibrantAccent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  listCard: {
    width: '48%',
    backgroundColor: colors.dark.primary + '20',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  deleteButton: {
    padding: 4,
  },
});
