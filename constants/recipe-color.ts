import { StyleSheet} from 'react-native';

 export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '600' 
  },
  subtitle: { 
    marginTop: 8, 
    fontSize: 16 
  },
 card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    height: 120, // Fixed height for the card
  },
  recipeImage: {
    width: 120,
    height: 120,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  nutritionInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionText: {
    fontSize: 11,
    color: '#444',
  }
});