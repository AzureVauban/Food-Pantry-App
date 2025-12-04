import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import MySearch from '../components/Searchbar';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

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
        (recipe) => recipe.recipe_name !== recipeToRemove.recipe_name
      );
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
      alert('Recipe removed!');
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Failed to remove recipe');
    }
  };

  const handleSearchResults = (results: any) => {
    setSearchResults(results);
  };

  const RecipeCard = ({ recipe, isSaved }: { recipe: Recipe; isSaved: boolean }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.dark.background,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
      onPress={() =>
        router.push({
          pathname: '/screens/recipedetails',
          params: { recipeId: recipe.recipe_id },
        })
      }
    >
      {recipe.recipe_image ? (
        <Image
          source={{ uri: recipe.recipe_image }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>No Image</Text>
        </View>
      )}

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 4,
            color: colors.dark.vibrantAccent,
          }}
          numberOfLines={2}
        >
          {recipe.recipe_name}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: '#333',
            marginBottom: 6,
          }}
          numberOfLines={2}
        >
          {recipe.recipe_description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 6,
            gap: 6,
          }}
        >
          <Text style={nutriTag}>🔥 {recipe.recipe_nutrition.calories} cal</Text>
          <Text style={nutriTag}>🥩 {recipe.recipe_nutrition.protein}g</Text>
          <Text style={nutriTag}>🍚 {recipe.recipe_nutrition.carbohydrate}g</Text>
          <Text style={nutriTag}>🥑 {recipe.recipe_nutrition.fat}g</Text>
        </View>

        <Button
          mode="contained"
          onPress={(e) => {
            e.stopPropagation();
            isSaved ? removeRecipe(recipe) : saveRecipe(recipe);
          }}
          style={{
            backgroundColor: colors.dark.vibrantAccent,
            borderRadius: 8,
          }}
          labelStyle={{ color: 'white' }}
        >
          {isSaved ? 'Remove' : 'Save Recipe'}
        </Button>
      </View>
    </TouchableOpacity>
  );

  const nutriTag = {
    backgroundColor: colors.dark.vibrantAccent,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark.primary }}>
      <View
        style={{
          padding: 12,
          backgroundColor: colors.dark.vibrantAccent,
        }}
      >
        <Button
          mode="contained"
          buttonColor={colors.dark.vibrantAccent}
          onPress={() => setShowSaved(!showSaved)}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
        >
          {showSaved ? 'Show Search' : 'Show Saved'}
        </Button>
      </View>

      {!showSaved && (
        <MySearch
          onSearchResults={handleSearchResults}
          searchButtonColor={colors.dark.vibrantAccent} // this requires MySearch.tsx update
        />
      )}

      <ScrollView style={{ flex: 1 }}>
        {showSaved ? (
          savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} isSaved={true} />
            ))
          ) : (
            <EmptyMessage text="No saved recipes yet" />
          )
        ) : searchResults?.recipes?.recipe ? (
          searchResults.recipes.recipe.map((recipe: Recipe, index: number) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isSaved={savedRecipes.some((s) => s.recipe_name === recipe.recipe_name)}
            />
          ))
        ) : (
          <EmptyMessage text="Search for recipes above" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const EmptyMessage = ({ text }: { text: string }) => (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Text style={{ fontSize: 18, color: colors.dark.vibrantAccent }}>{text}</Text>
  </View>
);
