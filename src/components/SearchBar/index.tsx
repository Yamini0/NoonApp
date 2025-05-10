import React from 'react';
import {TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {SearchBarProps} from './SearchBar.type';

const SearchBar: React.FC<SearchBarProps> = ({
  shouldNavigate,
  editable = false,
  value,
  onChangeText,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={shouldNavigate ? () => navigation.navigate('Search') : undefined}
      style={styles.searchContainer}
      activeOpacity={0.8}>
      <MaterialIcons name="search" size={20} color="#1C1C1B" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#1C1C1B"
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
        value={value}
        onChangeText={onChangeText}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    height: 45,
    width: '100%',
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1C1B',
    flex: 1,
  },
});
