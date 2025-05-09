import React, {useMemo, useCallback} from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useGetBannersQuery,
  useGetProductsQuery,
} from '../../redux/api/productApi';
import BannerCarousel from '../../components/BannerCarousel';
import {ProductSection, SectionItem} from './HomeScreen.type';
import {useNavigation} from '@react-navigation/native';

const SearchBar = React.memo(({navigation}) => (
  <View style={styles.searchWrapper}>
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => navigation.navigate('Search')}>
      <MaterialIcons name="search" size={20} color="#1C1C1B" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#1C1C1B"
        onPress={() => navigation.navigate('Search')}
      />
    </TouchableOpacity>
    <TouchableOpacity style={styles.cartButton}>
      <MaterialIcons name="shopping-cart" size={20} color="#1C1C1B" />
    </TouchableOpacity>
  </View>
));

const HorizontalProductCard = React.memo(({item}) => (
  <TouchableOpacity style={styles.productCard}>
    <Image source={{uri: item.image}} style={styles.productImage} />
    <Text numberOfLines={1} style={styles.productName}>
      {item.name}
    </Text>
    <Text style={styles.productPrice}>${item.price}</Text>
  </TouchableOpacity>
));

const VerticalProductCard = React.memo(({item}) => (
  <TouchableOpacity style={styles.verticalCard}>
    <Image source={{uri: item.image}} style={styles.verticalImage} />
    <View style={styles.rightContainer}>
      <View style={styles.verticalInfo}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.tagContainer}>
        {(item.tags || []).map((tag, idx) => (
          <Text key={idx} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  </TouchableOpacity>
));

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {data: banners = []} = useGetBannersQuery();
  const {data: products = []} = useGetProductsQuery();

  const navigation = useNavigation();

  const sections: ProductSection[] = useMemo(
    () => [
      {
        title: 'Flash Deals for You',
        horizontal: true,
        data: [products],
      },
      {
        title: 'Recommended for You',
        horizontal: false,
        data: products,
      },
    ],
    [products],
  );

  const renderItem = useCallback(
    ({item, section}: {item: SectionItem; section: ProductSection}) =>
      section.horizontal ? (
        <FlatList
          data={item}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={product => product.id}
          renderItem={({item}) => <HorizontalProductCard item={item} />}
          contentContainerStyle={{paddingHorizontal: 16}}
        />
      ) : (
        <VerticalProductCard item={item} />
      ),
    [],
  );

  return (
    <SafeAreaView edges={['left']} style={styles.wrapper}>
      <View style={[styles.container, {paddingTop: top}]}>
        <LinearGradient
          colors={['#FFDE0C', '#fff']}
          style={styles.headerGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.9}}
        />

        <SectionList
          ListHeaderComponent={
            <>
              <SearchBar navigation={navigation} />
              <BannerCarousel banners={banners} />
            </>
          }
          sections={sections}
          keyExtractor={(item, index) => item.id + index}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.flashHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 80}}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  wrapper: {flex: 1, backgroundColor: '#fff'},
  headerGradient: {
    position: 'absolute',
    top: 0,
    height: 160,
    width: '100%',
    zIndex: -1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
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
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 8,
    marginTop: 6,
  },
  flashHeader: {
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  productCard: {
    width: 140,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    marginEnd: 16,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  verticalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  verticalImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  verticalInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  rightContainer: {
    padding: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0f0ff',
    color: '#007bff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginTop: 4,
  },
});
