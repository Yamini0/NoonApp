import React, {useMemo, useCallback} from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList,
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
import SearchBar from '../../components/SearchBar';
import {
  HorizontalProductCard,
  VerticalProductCard,
} from '../../components/ProductCard';
import {useSelector} from 'react-redux';
import {selectTotalCartItemCount} from '../../redux/slice/cartSlice';

const HeaderSearchBar = React.memo(({navigation, totalItems}) => (
  <View style={styles.searchWrapper}>
    <View style={styles.flex}>
      <SearchBar editable={false} shouldNavigate />
    </View>
    <>
      <View style={styles.cartItemContainer}>
        <Text style={styles.cartItem}>{totalItems}</Text>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}>
        <MaterialIcons name="shopping-cart" size={20} color="#1C1C1B" />
      </TouchableOpacity>
    </>
  </View>
));

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {data: banners = []} = useGetBannersQuery();
  const {data: products = []} = useGetProductsQuery();

  const totalItems = useSelector(selectTotalCartItemCount);

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
          renderItem={({item}) => (
            <HorizontalProductCard
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: item,
                })
              }
            />
          )}
          contentContainerStyle={styles.paddingHorizontal}
        />
      ) : (
        <VerticalProductCard
          item={item}
          onPress={() =>
            navigation.navigate('ProductDetails', {
              product: item,
            })
          }
        />
      ),
    [navigation],
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
              <HeaderSearchBar
                navigation={navigation}
                totalItems={totalItems}
              />
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
  paddingHorizontal: {paddingHorizontal: 16},
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
  flex: {flex: 1},
  cartItemContainer: {
    zIndex: 100,
    width: 25,
    height: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e06666',
    right: 36,
    top: 2,
    position: 'absolute',
  },
  cartItem: {
    color: 'white',
  },
});
