import React, {useCallback} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../../redux/slice/cartSlice';
import {VerticalProductCard} from '../../components/ProductCard';
import NavBar from '../../components/NavBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product} from '../../redux/api/productApi.type';

export const CartScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state?.cart?.items);

  const handleIncrement = item => {
    dispatch(
      incrementQuantity({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedStorage: item.selectedStorage,
      }),
    );
  };

  const handleDecrement = item => {
    dispatch(
      decrementQuantity({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedStorage: item.selectedStorage,
      }),
    );
  };

  const handleRemove = item => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedStorage: item.selectedStorage,
      }),
    );
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce(
      (total, item) => total + item?.details?.price * item?.quantity,
      0,
    );
  };

  const shippingTax = 15;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingTax;

  const handleNavigation = useCallback(
    (item: Product) => {
      navigation.navigate('ProductDetails', {product: item});
    },
    [navigation],
  );

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Opps! No item present in cart</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <VerticalProductCard
        item={item?.details}
        showQuantityControls
        onPress={() => handleNavigation(item?.details)}
        onIncrement={() => handleIncrement(item)}
        onDecrement={() => handleDecrement(item)}
        onRemove={() => handleRemove(item)}
        onEdit={() => handleNavigation(item?.details)}
        quantity={item?.quantity}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Cart" overrideBack={() => navigation.popToTop()} />
      <FlatList
        data={cartItems}
        keyExtractor={item => item?.productId?.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={listEmptyComponent}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sub Total</Text>
          <Text style={styles.summaryValue}>
            ${calculateSubtotal()?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping & Tax</Text>
          <Text style={styles.summaryValue}>${shippingTax}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cartItems?.length === 0 && styles.checkoutButtonDisabled,
          ]}
          disabled={cartItems?.length === 0}
          onPress={() => navigation.navigate('Confirmation')}>
          <Text
            style={[
              styles.checkoutText,
              cartItems?.length === 0 && {color: '#fff'},
            ]}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 20,
  },
  promoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  promoText: {
    flex: 1,
    marginLeft: 8,
    color: '#888',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#444',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    color: '#a3a3a3',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#cccccc',
  },
});
