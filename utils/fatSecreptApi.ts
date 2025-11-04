import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '@/utils/firebaseConfig';

const functions = getFunctions(app);
const searchFoodsFn = httpsCallable(functions, 'searchFoods');
const getFoodDetailsFn = httpsCallable(functions, 'getFoodDetails');

export async function fetchFoods(query: string) {
  try {
    const response = await searchFoodsFn({
      searchTerm: query,
      pageNumber: 0,
      maxResults: 20,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching foods:', err);
    throw err;
  }
}

export async function fetchFoodDetails(foodId: string) {
  try {
    const response = await getFoodDetailsFn({ foodId });
    return response.data;
  } catch (err) {
    console.error('Error fetching food details:', err);
    throw err;
  }
}
