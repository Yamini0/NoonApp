import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';
import {useGetProductsQuery} from '../../redux/api/productApi';

import {Product} from '../../redux/api/productApi.type';
import {VerticalProductCard} from '../../components/ProductCard';
import {LoadingScreen} from '../../components/LoadingScreen';
import {ErrorScreen} from '../../components/ErrorScreen';

const MIN_QUERY_LENGTH = 2;

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const {data: products = [], isLoading, isError} = useGetProductsQuery();

  const shouldSearch = query.trim().length >= MIN_QUERY_LENGTH;

  const filteredProducts = useMemo(() => {
    if (!shouldSearch) {
      return [];
    }
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery),
    );
  }, [products, query, shouldSearch]);

  const renderEmptyComponent = useCallback(() => {
    if (!shouldSearch) {
      return (
        <Text style={styles.infoText}>Type at least 2 letters to search</Text>
      );
    }
    if (isLoading) {
      return <LoadingScreen />;
    }
    if (isError) {
      return <ErrorScreen />;
    }
    return <Text style={styles.infoText}>No products found.</Text>;
  }, [isError, isLoading, shouldSearch]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Product>) => (
      <VerticalProductCard item={item} />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar renderRight />
      <View style={styles.container}>
        <View style={styles.paddingHorizontal}>
          <SearchBar value={query} onChangeText={setQuery} editable />
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyComponent}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  infoText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#a3a3a3',
    paddingHorizontal: 16,
  },
  list: {
    paddingVertical: 16,
    flexGrow: 1, // Ensure ListEmptyComponent fills space
  },
});
