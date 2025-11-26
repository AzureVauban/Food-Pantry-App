import { db } from '../utils/firebaseConfig';
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  onSnapshot,
  orderBy,
  getDoc,
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

// -----------------------------
// Shared pantry API (top-level `pantries` collection)
// -----------------------------

function makeShareCode(length = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // omit confusing chars
  let out = '';
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function createSharedPantry(ownerId: string, pantryName: string) {
  // generate a unique shareCode
  let code = makeShareCode();
  let attempts = 0;
  while (attempts < 5) {
    const q = query(collection(db, 'pantries'), where('shareCode', '==', code));
    const snap = await getDocs(q);
    if (snap.empty) break;
    code = makeShareCode();
    attempts++;
  }

  const pantryRef = await addDoc(collection(db, 'pantries'), {
    name: pantryName,
    ownerId,
    members: [ownerId],
    shareCode: code,
    createdAt: serverTimestamp(),
  });

  return { pantryId: pantryRef.id, shareCode: code };
}

export async function joinPantryByCode(userId: string, code: string) {
  const q = query(collection(db, 'pantries'), where('shareCode', '==', code));
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('Invalid share code');
  const pantryDoc = snap.docs[0];
  const pantryRef = pantryDoc.ref;
  await updateDoc(pantryRef, { members: arrayUnion(userId) });
  return pantryRef.id;
}

export async function getPantriesForUser(userId: string) {
  // pantries where user is member or owner
  const pantriesRef = collection(db, 'pantries');
  const q = query(pantriesRef, where('members', 'array-contains', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

// Real-time listener for pantry items (shared pantries)
export function listenToPantryItems(
  pantryId: string,
  onUpdate: (items: PantryItem[]) => void,
) {
  const itemsRef = collection(db, 'pantries', pantryId, 'items');
  const q = query(itemsRef, orderBy('createdAt'));
  const unsub = onSnapshot(q, (snapshot) => {
    const items: PantryItem[] = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    onUpdate(items);
  });
  return unsub;
}

export async function addPantryItemShared(pantryId: string, item: Omit<PantryItem, 'id'>) {
  const itemsRef = collection(db, 'pantries', pantryId, 'items');
  const itemDoc = await addDoc(itemsRef, { ...item, createdAt: serverTimestamp() });
  return itemDoc.id;
}

export async function editPantryItemShared(pantryId: string, itemId: string, updateData: Partial<PantryItem>) {
  const itemRef = doc(db, 'pantries', pantryId, 'items', itemId);
  await setDoc(itemRef, updateData, { merge: true });
}

export async function deletePantryItemShared(pantryId: string, itemId: string) {
  const itemRef = doc(db, 'pantries', pantryId, 'items', itemId);
  await deleteDoc(itemRef);
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
    quantity: String(item.quantity),
    //expirationDate: item.expirationDate ? item.expirationDate : null,
    category: item.category ?? null,
    imageUrl: item.imageUrl ?? null,
    createdAt: serverTimestamp(),
  });

  return itemDoc.id; // itemId
}
export async function getPantryItems(
  userId: string,
  pantryId: string,
): Promise<PantryItem[]> {
  const itemsRef = collection(
    db,
    'users',
    userId,
    'pantries',
    pantryId,
    'items',
  );
  const snapshot = await getDocs(itemsRef);

  const items: PantryItem[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PantryItem, 'id'>),
  }));

  return items;
}
export async function deletePantry(userId: string, pantryId: string) {
  const pantryRef = doc(db, 'users', userId, 'pantries', pantryId);
  await deleteDoc(pantryRef);
}

export async function deleteSharedPantry(pantryId: string) {
  const pantryRef = doc(db, 'pantries', pantryId);
  await deleteDoc(pantryRef);
}

export async function editPantryItem(
  userId: string,
  pantryId: string,
  itemId: string,
  updateData: Partial<PantryItem>,
) {
  const itemRef = doc(
    db,
    'users',
    userId,
    'pantries',
    pantryId,
    'items',
    itemId,
  );
  await setDoc(itemRef, updateData, { merge: true });
}

export async function deletePantryItem(
  userId: string,
  pantryId: string,
  itemId: string,
) {
  const itemRef = doc(
    db,
    'users',
    userId,
    'pantries',
    pantryId,
    'items',
    itemId,
  );
  await deleteDoc(itemRef);
}

//   export async function getPantries(userId: string)
// : Promise<{ id: string; name: string }[]> {
//   const pantriesRef = collection(db, 'users', userId, 'pantries');
//   const snapshot = await getDocs(pantriesRef);
//   const pantries = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     name: (doc.data() as { name: string }).name,
//   }));
//   return pantries;
// }

export async function getPantries(userId: string) {
  const pantriesRef = collection(doc(db, 'users', userId), 'pantries');
  const snapshot = await getDocs(pantriesRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
}
