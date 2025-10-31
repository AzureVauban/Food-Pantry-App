import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, } from 'react-native';
import { styles } from '../../constants/recipe-color';
import MySearch from '../components/Searchbar';

interface Recipe {
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

  const handleSearchResults = (results: any) => {
    setSearchResults(results);
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => Linking.openURL(recipe.recipe_url)}
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
        <Text style={styles.recipeName} numberOfLines={2}>{recipe.recipe_name}</Text>
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
      </View>
    </View>
  </TouchableOpacity>
);
  
  return (
    <SafeAreaView style={styles.container}>
      <MySearch onSearchResults={handleSearchResults} />
      <ScrollView style={styles.resultsContainer}>
        {searchResults?.recipes?.recipe ? (
          <View>
            {searchResults.recipes.recipe.map((recipe: Recipe, index: number) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </View>
        ) : (
          <View style={styles.center}>
            <Text style={styles.title}>Recipes</Text> 
            <Text style={styles.subtitle}>Search for recipes above</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
