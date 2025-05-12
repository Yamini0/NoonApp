import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/home/HomeScreen';

import {RootStackParamList} from './RootNavigator.type';
import {SearchScreen} from '../screens/search/SearchScreen';

import {CartScreen} from '../screens/cart/CartScreen';
import {ProductDetailsScreen} from '../screens/productDetails/ProductDetailsScreen';
import {ConfirmationScreen} from '../screens/confirmation/ConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
