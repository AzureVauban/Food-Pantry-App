import { db } from '../firebase/firebaseConfig';
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { PantryItem } from '../types/pantry';

export async function createUser(userId: string, name: string, email: string) {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, { name, email });
}

export async function createPantry(userId: string, pantryName: string) {
  const userDocRef = doc(db, 'users', userId);
  const pantriesRef = collection(userDocRef, 'pantries');

  const pantryDoc = await addDoc(pantriesRef, {
    name: pantryName,
    createdAt: serverTimestamp(),
  });

  return pantryDoc.id; // pantryId
}

export async function addPantryItem(
  userId: string,
  pantryId: string,
  item: Omit<PantryItem, 'id'>,
) {
  const pantryRef = doc(db, 'users', userId, 'pantries', pantryId);
  const itemsRef = collection(pantryRef, 'items');

  const itemDoc = await addDoc(itemsRef, {
    name: item.name,
    quantity: item.quantity,
    //expirationDate: item.expirationDate ? item.expirationDate : null,
    category: item.category ?? null,
    imageUrl: item.imageUrl ?? null,
    createdAt: serverTimestamp(),
  });

  return itemDoc.id; // itemId
}
