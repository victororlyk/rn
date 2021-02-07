import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ManageProducts from '../screens/ManageProducts/ManageProducts'
import EditProduct from '../screens/ManageProducts/EditProduct'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../components/HeadeerBtn'
import Colors from '../constants/Colors'

const Stack = createStackNavigator()

const defaultStackNavOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: '#ffffff'
};

export default () => {
  return (
    <Stack.Navigator initialRouteName="ManageProducts">
      <Stack.Screen
        name="ManageProducts"
        component={ManageProducts}
        options={({ navigation }) => ({
          ...defaultStackNavOptions,
          title: 'Manage Products',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons>
              <Item title="Add" iconName='ios-create' onPress={() => {
                navigation.navigate("EditProducts", { isAdding: true })
              }} />
            </HeaderButtons>
          )
        })} />
      <Stack.Screen
        name="EditProducts"
        component={EditProduct}
        options={({ navigation, route }: any) => ({
          ...defaultStackNavOptions,
          title: route.params.isAdding ? "Add Product" : "Edit product",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Save" iconName="ios-save" onPress={() => {
                route.params.saveChanges();
              }} />
            </HeaderButtons>
          )
        })} />
    </Stack.Navigator>
  )
}
