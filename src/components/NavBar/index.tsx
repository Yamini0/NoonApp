import React, {useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NavBarProps} from './NavBar.type';
import {useSelector} from 'react-redux';
import {selectTotalCartItemCount} from '../../redux/slice/cartSlice';

const NavBar = ({
  overrideBack,
  renderRight,
  showBack = true,
  title,
}: NavBarProps) => {
  const navigation = useNavigation();

  const totalItems = useSelector(selectTotalCartItemCount);

  const handleOnBackPress = useCallback(() => {
    if (typeof overrideBack === 'function') {
      overrideBack();
      return;
    }
    navigation.goBack();
  }, [navigation, overrideBack]);

  const handleCartIconPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={handleOnBackPress} style={styles.icon}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {renderRight && (
        <>
          <View style={styles.cartItemContainer}>
            <Text style={styles.cartItemText}>{totalItems}</Text>
          </View>

          <TouchableOpacity
            onPress={handleCartIconPress}
            style={[styles.icon, styles.marginLeft, styles.right]}>
            <MaterialIcons name="shopping-cart" size={22} color="black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderRadius: 50,
    borderColor: '#d6d6d6',
  },
  marginLeft: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginStart: 24,
  },
  right: {
    position: 'absolute',
    right: 16,
  },
  cartItemContainer: {
    zIndex: 100,
    width: 25,
    height: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e06666',
    right: 42,
    top: 8,
    position: 'absolute',
  },
  cartItemText: {
    color: '#fff',
  },
});
