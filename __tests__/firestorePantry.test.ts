// __tests__/firestorePantry.test.ts
import {
  createUser,
  createPantry,
  addPantryItem,
} from '../utils/firestorePantry';
import { PantryItem } from '../types/pantry';

describe('Firestore Pantry Integration', () => {
  it('should create a user and pantry in Firestore with a random userId', async () => {
    // Generate a random userId
    const userId = 'user_' + Math.random().toString(36).substring(2, 10);
    const name = 'Test User';
    const email = 'testuser@example.com';
    await createUser(userId, name, email);
    const pantryName = 'Integration Test Pantry';
    const pantryId = await createPantry(userId, pantryName);
    console.log('Created user:', userId, 'and pantry:', pantryId);
    expect(typeof pantryId).toBe('string');
  });

  it('should add a pantry item in Firestore with random userId and pantryId', async () => {
    // Generate random userId and pantryId
    const userId = 'user_' + Math.random().toString(36).substring(2, 10);
    const name = 'Test User';
    const email = 'testuser@example.com';
    await createUser(userId, name, email);
    const pantryName = 'Integration Test Pantry';
    // First, create a pantry to get a pantryId
    const pantryId = await createPantry(userId, pantryName);
    const item: Omit<PantryItem, 'id'> = {
      name: 'Bananas',
      quantity: 10,
      expirationDate: new Date(),
      category: 'Fruit',
      imageUrl: '',
    };
    const itemId = await addPantryItem(userId, pantryId, item);
    console.log(
      'Added item with ID:',
      itemId,
      'to pantry:',
      pantryId,
      'for user:',
      userId,
    );
    expect(typeof itemId).toBe('string');
  });
});

//ALl test passed
