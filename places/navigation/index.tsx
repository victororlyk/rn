import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HeaderBtn from '../components/HeaderBtn'

import PlacesList from '../screens/PlacesList';
import Map from '../screens/Map';
import PlacesDetails from '../screens/PlacesDetails'
import NewPlace from '../screens/NewPlace'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();


const defaultStackNavOptions = {
  headerStyle: { backgroundColor: 'pink' },
  headerTintColor: '#ffffff'
};

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="PlacesList">
      <Stack.Screen name="PlacesList" component={PlacesList}
                    options={({ navigation }) => ({
                      ...defaultStackNavOptions,
                      title: 'Places list',
                      headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                          <Item
                            title="Add Place"
                            iconName="ios-add"
                            onPress={() => {
                              navigation.navigate("NewPlace")
                            }} />
                        </HeaderButtons>
                      )
                    })}
      />
      <Stack.Screen
        name="PlacesDetails"
        component={PlacesDetails}
        options={({ navigation, route }) => ({
          ...defaultStackNavOptions,
          title: route.params.placeTitle,
        })}
      />
      <Stack.Screen
        name="NewPlace" component={NewPlace}
        options={({ navigation }) => ({
          ...defaultStackNavOptions,
          title: 'Add place',
        })}
      />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
