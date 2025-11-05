import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { searchRecipesCall } from '../../utils/firebaseRecipcall';

interface MySearchProps {
  onSearchResults: (results: any) => void;
}

const MySearch = ({ onSearchResults }: MySearchProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchRecipesCall({
        searchTerm: searchQuery,
        pageNumber: 0,
        maxResults: 20
      });
      onSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Searchbar
            style={styles.looks}
            placeholder="Search recipes"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <Button 
          mode="contained"
          onPress={handleSearch}
          loading={loading}
          style={styles.button}
        >
          Search
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  looks: {
    borderRadius: 0,
    borderColor: 'black',
    margin: 0,
  },
  button: {
    height: 40,
    justifyContent: 'center',
  }
});

export default MySearch;
