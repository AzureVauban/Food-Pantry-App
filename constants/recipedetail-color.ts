import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  directionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  directionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    minWidth: 24,
  },
  directionText: {
    fontSize: 16,
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
});
