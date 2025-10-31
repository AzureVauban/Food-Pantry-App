import { getFunctions, httpsCallable } from 'firebase/functions';

export interface RecipeSearchParams {
  searchTerm: string;
  pageNumber?: number;
  maxResults?: number;
}

export const searchRecipesCall = async (params: RecipeSearchParams) => {
  try {
    const functions = getFunctions();
    const searchRecipes = httpsCallable(functions, 'searchRecipes');
    const result = await searchRecipes(params);
    return result.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};