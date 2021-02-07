import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Orders from '../screens/Shop/Orders'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../components/HeadeerBtn'
import Colors from '../constants/Colors'

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: '#ffffff'
};

export default () => {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({ navigation }) => ({
          ...defaultStackNavOptions,
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          )
        })} />
    </Stack.Navigator>
  )
}
