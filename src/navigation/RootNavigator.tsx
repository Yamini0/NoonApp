import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/home/HomeScreen';

import {Text} from 'react-native';
import {RootStackParamList} from './RootNavigator.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={() => <Text>Search</Text>} />
        <Stack.Screen
          name="ProductDetails"
          component={() => <Text>Product Details</Text>}
        />
        <Stack.Screen name="Cart" component={() => <Text>Cart</Text>} />
        <Stack.Screen name="Review" component={() => <Text>Review</Text>} />
        <Stack.Screen
          name="Confirmation"
          component={() => <Text>Confirmation</Text>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
