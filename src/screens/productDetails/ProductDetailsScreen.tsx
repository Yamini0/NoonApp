import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigation/RootNavigator.type';
import ColorSelector from '../../components/ColorSelector';
import ImageGallery from '../../components/ImageGallery';
import StorageSelector from '../../components/StorageSelector';
import QuantitySelector from '../../components/QuantitySelector';
import NavBar from '../../components/NavBar';
import {
  addToCart,
  updateCartItem,
  selectCartItemByProductId,
  incrementQuantity,
  decrementQuantity,
} from '../../redux/slice/cartSlice';

export const ProductDetailsScreen: React.FC = ({navigation}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetails'>>();
  const product = route?.params?.product;
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = React.useState(
    cartItem?.selectedColor || product.colors?.[0] || null,
  );
  const [selectedStorage, setSelectedStorage] = React.useState(
    cartItem?.selectedStorage || product.storages?.[0] || null,
  );

  useSelector(state => state.cart);

  const cartItem = useSelector((state: RootState) =>
    selectCartItemByProductId(
      state,
      product.id,
      selectedColor,
      selectedStorage,
    ),
  );

  const quantity = cartItem?.quantity || 1;

  useEffect(() => {
    if (cartItem) {
      dispatch(
        updateCartItem({
          productId: product.id,
          selectedColor,
          selectedStorage,
          quantity,
        }),
      );
    }
  }, [
    selectedColor,
    selectedStorage,
    quantity,
    cartItem,
    dispatch,
    product.id,
  ]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity,
        selectedColor,
        selectedStorage,
        product,
        details: product,
      }),
    );
  };

  const handleIncrement = () => {
    dispatch(
      incrementQuantity({
        productId: product.id,
        selectedColor,
        selectedStorage,
      }),
    );
  };

  const handleDecrement = () => {
    dispatch(
      decrementQuantity({
        productId: product.id,
        selectedColor,
        selectedStorage,
      }),
    );
  };

  const handleBuyNow = useCallback(() => {
    navigation.navigate('Confirmation');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar renderRight />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageGallery image={product?.image} />

        <View style={styles.content}>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productBrand}>
            by<Text style={{color: '#007bff'}}> {product?.brand}</Text>
          </Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.productPrice}>${product?.price}</Text>
            <QuantitySelector
              quantity={quantity}
              onDecrease={handleDecrement}
              onIncrease={handleIncrement}
            />
          </View>
          {product?.storages && (
            <StorageSelector
              options={product?.storages}
              onSelect={setSelectedStorage}
              selected={selectedStorage}
            />
          )}
          {product?.colors && (
            <ColorSelector
              options={product?.colors}
              onSelect={setSelectedColor}
              selected={selectedColor}
            />
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>Description</Text>
          {product?.description?.map((point: string, index: number) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.text}>{point}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cartInfo} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleBuyNow}>
          <Text style={styles.addText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cartInfo: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  cartText: {fontSize: 16},
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 52,
    paddingVertical: 10,
    borderRadius: 24,
  },
  addText: {
    color: '#fff',
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  bullet: {
    fontSize: 14,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
