import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';


const MySearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      style={styles.looks}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
    looks: {borderRadius: 0, borderColor: 'black', },
});

export default MySearch;
