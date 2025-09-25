import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView,Image, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { styles } from '../../constants/recipe-color';
import MySearch from '../components/Searchbar';
import { useRouter } from 'expo-router';

interface Recipe {
  recipe_id: string | number | (string | number)[] | null | undefined;
  recipe_name: string;
  recipe_description: string;
  recipe_image?: string;
  recipe_nutrition: {
    calories: string;
    protein: string;
    carbohydrate: string;
    fat: string;
  };
  recipe_url: string;
}

export default function Recipes() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const router = useRouter();
 

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedRecipes');
      if (saved) {
        setSavedRecipes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    }
  };

  const saveRecipe = async (recipe: Recipe) => {
    try {
      const updatedRecipes = [...savedRecipes, recipe];
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
      alert('Recipe saved!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe');
    }
  };

  const removeRecipe = async (recipeToRemove: Recipe) => {
    try {
      const updatedRecipes = savedRecipes.filter(
        recipe => recipe.recipe_name !== recipeToRemove.recipe_name
      );
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
      alert('Recipe removed!');
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Failed to remove recipe');
    }
  };

  // Handler for search results passed to MySearch
  const handleSearchResults = (results: any) => {
  console.log('Search results received:', results); // Add this line
  setSearchResults(results);
  };

  

  const RecipeCard = ({ recipe, isSaved }: { recipe: Recipe; isSaved: boolean }) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => router.push({
      pathname: "/screens/recipedetails", 
      params: { recipeId: recipe.recipe_id }
    })}
  >
    <View style={styles.cardContent}>
      {recipe.recipe_image ? (
        <Image
          source={{ uri: recipe.recipe_image }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>No Image</Text>
        </View>
      )}
      
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {recipe.recipe_name}
        </Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {recipe.recipe_description}
        </Text>
        
        <View style={styles.nutritionInfo}>
          <Text style={styles.nutritionText}>
            🔥 {recipe.recipe_nutrition.calories} cal
          </Text>
          <Text style={styles.nutritionText}>
            🥩 {recipe.recipe_nutrition.protein}g
          </Text>
          <Text style={styles.nutritionText}>
            🍚 {recipe.recipe_nutrition.carbohydrate}g
          </Text>
          <Text style={styles.nutritionText}>
            🥑 {recipe.recipe_nutrition.fat}g
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={(e) => {
            e.stopPropagation();
            if (isSaved) {
              removeRecipe(recipe);
            } else {
              saveRecipe(recipe);
            }
          }}
          style={styles.saveButton}
        >
          {isSaved ? 'Remove' : 'Save Recipe'}
        </Button>
      </View>
    </View>
  </TouchableOpacity>
);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          mode="contained"
          onPress={() => setShowSaved(!showSaved)}
          style={styles.toggleButton}
        >
          {showSaved ? 'Show Search' : 'Show Saved'}
        </Button>
      </View>

      {!showSaved && <MySearch onSearchResults={handleSearchResults} />}
      
      <ScrollView style={styles.resultsContainer}>
        {showSaved ? (
          savedRecipes.length > 0 ? (
            <View>
              {savedRecipes.map((recipe: Recipe, index: number) => (
                <RecipeCard key={index} recipe={recipe} isSaved={true} />
              ))}
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.subtitle}>No saved recipes yet</Text>
            </View>
          )
        ) : (
          searchResults?.recipes?.recipe ? (
            <View>
              {searchResults.recipes.recipe.map((recipe: Recipe, index: number) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  isSaved={savedRecipes.some(
                    saved => saved.recipe_name === recipe.recipe_name
                  )} 
                />
              ))}
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.title}>Recipes</Text> 
              <Text style={styles.subtitle}>Search for recipes above</Text>
            </View>
          )
          
        )}
      </ScrollView>
    </SafeAreaView>
  );
}