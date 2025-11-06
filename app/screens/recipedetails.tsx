import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { styles } from '../../constants/recipedetail-color';
import { Button } from 'react-native-paper';

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
    recipe_types?: {
      recipe_type: string | string[];
    };
    serving: {
      serving_size: string;
      // ...existing serving properties...
    };
    ingredients: {
      ingredient: {
        food_id: number;
        food_name: string;
        ingredient_description: string;
        ingredient_url: string;
        serving_id: number;
        number_of_units: number;
        measurement_description: string;
      }[];
    };
    directions?: {
      direction: {
        direction_number: number;
        direction_description: string;
      }[];
    };
  };
}

export default function RecipeDetails() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<IRecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View>
        <Text>{error || 'Recipe not found'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          mode="contained"
          onPress={() => router.replace('/screens/recipes')}
          style={styles.backButton}
        >
          Back to Recipes
        </Button>
      </View>
      <ScrollView>
        {recipe?.recipe?.recipe_image && (
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
          </View>

          {/* Directions */}
          {recipe.recipe.directions?.direction && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Directions</Text>
              {recipe.recipe.directions.direction.map((step) => (
                <View key={step.direction_number} style={styles.directionItem}>
                  <Text style={styles.directionNumber}>
                    {step.direction_number}.
                  </Text>
                  <Text style={styles.directionText}>
                    {step.direction_description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
