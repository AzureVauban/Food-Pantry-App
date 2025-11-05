// functions/index.js
const functions = require('firebase-functions');
const fetch = require('node-fetch');
const { Buffer } = require('buffer');

// FatSecret configuration (stored in Firebase environment config)
function getFatSecretConfig() {
  const config = functions.config().fatsecret;
  if (!config || !config.client_id || !config.client_secret) {
    throw new Error('FatSecret config is not set!');
  }
  return {
    clientId: config.client_id,
    clientSecret: config.client_secret,
    tokenUrl: 'https://oauth.fatsecret.com/connect/token',
    apiUrl: 'https://platform.fatsecret.com/rest/server.api',
  };
}

// In-memory token cache (persists during function warm starts)
let accessToken = null;
let tokenExpiry = null;

/**
 * Get OAuth 2.0 access token
 */
async function getAccessToken() {
  const FATSECRET_CONFIG = getFatSecretConfig(); // Lazy-load config here

  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const credentials = Buffer.from(
      `${FATSECRET_CONFIG.clientId}:${FATSECRET_CONFIG.clientSecret}`
    ).toString('base64');

    const response = await fetch(FATSECRET_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials&scope=basic',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Token request failed: ${errorData.error_description || errorData.error}`);
    }

    const data = await response.json();

    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // refresh 1 min early

    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}
/**
 * Make request to FatSecret API
 */
async function fatSecretRequest(method, params = {}) {
  const FATSECRET_CONFIG = getFatSecretConfig(); // Lazy-load config here

  try {
    const token = await getAccessToken();

    const requestParams = new URLSearchParams({
      method: method,
      format: 'json',
      ...params,
    });

    const response = await fetch(`${FATSECRET_CONFIG.apiUrl}?${requestParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('FatSecret API Error:', error);
    throw error;
  }
}

// ============================================
// CLOUD FUNCTIONS
// ============================================

/**
 * Search for foods
 * Usage: POST https://your-project.cloudfunctions.net/searchFoods
 * Body: { "searchTerm": "apple", "pageNumber": 0, "maxResults": 20 }
 */
exports.searchFoods = functions.https.onCall(async (data, context) => {
  try {
    const { searchTerm, pageNumber = 0, maxResults = 10 } = data;

    if (!searchTerm) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'searchTerm is required'
      );
    }

    const result = await fatSecretRequest('foods.search', {
      search_expression: searchTerm,
      page_number: pageNumber,
      max_results: maxResults,
    });

    return result;
  } catch (error) {
    console.error('Error searching foods:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Get food details by ID
 * Usage: POST https://your-project.cloudfunctions.net/getFoodDetails
 * Body: { "foodId": "12345" }
 */
exports.getFoodDetails = functions.https.onCall(async (data, context) => {
  try {
    const { foodId } = data;

    if (!foodId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'foodId is required'
      );
    }

    const result = await fatSecretRequest('food.get.v2', {
      food_id: foodId,
    });

    return result;
  } catch (error) {
    console.error('Error getting food details:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Search for recipes
 * Usage: POST https://your-project.cloudfunctions.net/searchRecipes
 * Body: { "searchTerm": "chicken", "pageNumber": 0, "maxResults": 20 }
 */
exports.searchRecipes = functions.https.onCall(async (data, context) => {
  try {
    const { searchTerm, pageNumber = 0, maxResults = 20 } = data;

    if (!searchTerm) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'searchTerm is required'
      );
    }

    const result = await fatSecretRequest('recipes.search', {
      search_expression: searchTerm,
      page_number: pageNumber,
      max_results: maxResults,
    });

    return result;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Get recipe details by ID
 * Usage: POST https://your-project.cloudfunctions.net/getRecipeDetails
 * Body: { "recipeId": "12345" }
 */
exports.getRecipeDetails = functions.https.onCall(async (data, context) => {
  try {
    const { recipeId } = data;

    if (!recipeId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'recipeId is required'
      );
    }

    const result = await fatSecretRequest('recipe.get', {
      recipe_id: recipeId,
    });

    return result;
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Get autocomplete suggestions
 * Usage: POST https://your-project.cloudfunctions.net/getAutocompleteSuggestions
 * Body: { "searchTerm": "app" }
 */
exports.getAutocompleteSuggestions = functions.https.onCall(async (data, context) => {
  try {
    const { searchTerm } = data;

    if (!searchTerm) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'searchTerm is required'
      );
    }

    const result = await fatSecretRequest('foods.autocomplete', {
      expression: searchTerm,
    });

    return result;
  } catch (error) {
    console.error('Error getting autocomplete suggestions:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
