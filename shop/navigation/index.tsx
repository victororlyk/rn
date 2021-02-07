import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import AuthStack from './auth';
import ShopStack from './shop';
import OrdersStack from './orders';
import ManageProductsStack from './manageProducts';
import { logout } from '../store/actions/auth'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logoutHandler} />
    </DrawerContentScrollView>
  );
}

export default () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
  const auth = useSelector((state: any) => state.auth)
  console.log(auth)
  return (
    <NavigationContainer>
      {isLoggedIn ? (
          <Drawer.Navigator
            initialRouteName="Shop"
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Shop" component={ShopStack} options={{
              drawerIcon: drawerConfig => (
                <Ionicons name="ios-cart" size={23} />
              )
            }} />
            <Drawer.Screen
              name="Orders" component={OrdersStack}
              options={{
                drawerIcon: drawerConfig => (
                  <Ionicons name="ios-cart" size={23} />
                )
              }} />
            <Drawer.Screen
              name="ManageProducts" component={ManageProductsStack}
              options={{
                title: "Manage Products",
                drawerIcon: drawerConfig => (
                  <Ionicons name="ios-create" size={23} />
                )
              }} />
          </Drawer.Navigator>
        )
        : (
          <Drawer.Navigator initialRouteName="Auth">
            <Drawer.Screen name="Auth" component={AuthStack} options={{ title: 'Auth' }} />
          </Drawer.Navigator>
        )}

    </NavigationContainer>
  )
}
