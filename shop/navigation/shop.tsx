import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Shop from '../screens/Shop/Shop';
import ProductDetails from '../screens/Shop/ProductDetails'
import HeaderBtn from '../components/HeadeerBtn'
import { useSelector } from 'react-redux'
import Cart from '../screens/Shop/Cart'
import Colors from '../constants/Colors'

const Stack = createStackNavigator()

const defaultStackNavOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: '#ffffff'
};

export default () => {
  const products = useSelector((state: any) => state.products.products)
  return (
    <Stack.Navigator initialRouteName="Shop">
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={({ navigation }) => ({
          ...defaultStackNavOptions,
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                title="cart"
                iconName="ios-cart"
                onPress={() => {
                  navigation.navigate("Cart")
                }} />
            </HeaderButtons>
          )
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ route, navigation }: any) => ({
          ...defaultStackNavOptions,
          title: products.find(({ id }: any) => id == route.params.productId).title,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                title="cart"
                iconName="ios-cart"
                onPress={() => {
                  navigation.navigate("Cart")
                }} />
            </HeaderButtons>
          )
        })} />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={() => ({
          ...defaultStackNavOptions,
        })}
      />
    </Stack.Navigator>
  )
}
