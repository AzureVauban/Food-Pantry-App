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
      <Searchbar
        style={styles.looks}
        placeholder="Search recipes"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button 
        mode="contained"
        onPress={handleSearch}
        loading={loading}
        style={styles.button}
      >
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  looks: {
    borderRadius: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    marginTop: 5,
  }
});

export default MySearch;