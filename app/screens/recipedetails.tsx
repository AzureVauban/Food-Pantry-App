import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Button, Modal, Portal } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { styles } from '../../constants/recipedetail-color';

interface IRecipeDetails {
  recipe: {
    recipe_id: number;
    recipe_name: string;
    recipe_url: string;
    recipe_image?: string;
    recipe_description: string;
    number_of_servings: number;
    grams_per_portion: number;
    preparation_time_min?: number;
    cooking_time_min?: number;
    rating?: number;
    recipe_types?: { recipe_type: string | string[] };
    serving: { serving_size: string };
    ingredients: { ingredient: { ingredient_description: string }[] };
    directions?: { direction: { direction_number: number; direction_description: string }[] | { direction_number: number; direction_description: string } };
  };
}

interface GroceryItemType {
  name: string;
  quantity: number;
  purchased: boolean;
}

interface GroceryListType {
  title: string;
  items: GroceryItemType[];
}

export default function RecipeDetails() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<IRecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lists, setLists] = useState<GroceryListType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(null);
  const [pantryItems, setPantryItems] = useState<{ name: string }[]>([]);


  const router = useRouter();

  // Load recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const functions = getFunctions();
        const getRecipeDetails = httpsCallable(functions, 'getRecipeDetails');
        const result = await getRecipeDetails({ recipeId });
        setRecipe(result.data as IRecipeDetails);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);

  // Load grocery lists from localStorage
  useEffect(() => {
    const storedLists = localStorage.getItem('groceryLists');
    if (storedLists) setLists(JSON.parse(storedLists));
  }, []);

  // Load pantry
  useEffect(() => {
    const storedPantry = localStorage.getItem('pantryItems');
    if (storedPantry) setPantryItems(JSON.parse(storedPantry));
  }, []);

  const saveListsToStorage = (updatedLists: GroceryListType[]) => {
    localStorage.setItem('groceryLists', JSON.stringify(updatedLists));
    setLists(updatedLists);
  };

  const addIngredientsToList = () => {
  if (selectedListIndex === null || !recipe) return;

  const updatedLists = [...lists];
  const targetList = updatedLists[selectedListIndex];

  const pantryNames = pantryItems.map(item => item.name.toLowerCase());

  // Filter ingredients: only add those not already in pantry
  const missingIngredients = recipe.recipe.ingredients.ingredient.filter(item =>
    !pantryNames.includes(item.ingredient_description.toLowerCase())
  );

  // Add ONLY missing ones
  missingIngredients.forEach(item => {
    if (!targetList.items.some(i => i.name === item.ingredient_description)) {
      targetList.items.push({
        name: item.ingredient_description,
        quantity: 1,
        purchased: false,
      });
    }
  });

  saveListsToStorage(updatedLists);
  setModalVisible(false);

  if (missingIngredients.length === 0) {
    alert("All ingredients are already in your pantry!");
  } else {
    alert(`Added ${missingIngredients.length} missing ingredient(s) to "${targetList.title}".`);
  }
};


  if (loading) return <ActivityIndicator size="large" />;

  if (error || !recipe) return <Text>{error || 'Recipe not found'}</Text>;

  // Ensure directions is always an array
  const directionsArray =
    recipe.recipe.directions?.direction
      ? Array.isArray(recipe.recipe.directions.direction)
        ? recipe.recipe.directions.direction
        : [recipe.recipe.directions.direction]
      : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark.primary }}>
      <View style={{ padding: 12, backgroundColor: colors.dark.vibrantAccent }}>
        <Button
          mode="contained"
          onPress={() => router.replace('/screens/recipes')}
          buttonColor={colors.dark.vibrantAccent}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
        >
          Back to Recipes
        </Button>
      </View>

      <ScrollView>
        {recipe.recipe.recipe_image && (
          <Image
            source={{ uri: recipe.recipe.recipe_image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.recipe.recipe_name}</Text>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.recipe.ingredients.ingredient.map((item, index) => (
              <Text key={index} style={styles.ingredientItem}>
                • {item.ingredient_description}
              </Text>
            ))}

            <Button
              mode="contained"
              onPress={() => setModalVisible(true)}
              style={{ marginTop: 10, backgroundColor: colors.dark.vibrantAccent }}
              labelStyle={{ color: 'white' }}
            >
              Add to List
            </Button>
          </View>

          {/* Directions */}
          {directionsArray.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Directions</Text>
              {directionsArray.map((step) => (
                <View key={step.direction_number} style={styles.directionItem}>
                  <Text style={styles.directionNumber}>{step.direction_number}.</Text>
                  <Text style={styles.directionText}>{step.direction_description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal for selecting grocery list */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: colors.dark.background,
            padding: 20,
            margin: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 12, color: colors.dark.vibrantAccent }}>
            Select a list to add ingredients
          </Text>
          {lists.map((list, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedListIndex(index)}
              style={{
                padding: 10,
                backgroundColor: selectedListIndex === index ? colors.dark.vibrantAccent : '#ccc',
                marginVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: selectedListIndex === index ? 'white' : 'black',
                  fontWeight: '600',
                }}
              >
                {list.title}
              </Text>
            </TouchableOpacity>
          ))}
          <Button
            mode="contained"
            onPress={addIngredientsToList}
            style={{ marginTop: 12, backgroundColor: colors.dark.vibrantAccent }}
            labelStyle={{ color: 'white' }}
          >
            Add Ingredients
          </Button>
          <Button
            mode="outlined"
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 8, borderColor: colors.dark.vibrantAccent }}
            labelStyle={{ color: colors.dark.vibrantAccent }}
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
