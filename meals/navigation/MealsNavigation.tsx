import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { toggleFavorite } from '../store/actions/meals'
import Categories from '../screens/Categories'
import CategoriesMeals from '../screens/CategoriesMeals'
import MealDetails from '../screens/MealDetails'
import Favorites from '../screens/Favorites'
import Filters from '../screens/Filters'
import HeaderBtn from '../components/HeaderBtn'
import Colors from '../constants/Colors'
import { CATEGORIES } from '../data/dummy-data'

const Stack = createStackNavigator()

const getCategoryMealsName = (catId: string) => {
  const selectedCategory = CATEGORIES.find(({ id }) => id === catId)
  return selectedCategory?.title ?? 'not found'
}

const getMealName = (mealId: string, meals: any) => {
  const selectedMeal = meals.find(({ id }: any) => id === mealId)
  return selectedMeal?.title ?? 'not found'
}

const defaultStackNavOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: '#ffffff'
};

const MealsStack = () => {
  const meals = useSelector((state: any) => state.meals.meals);
  const favMeals = useSelector((state: any) => state.meals.favoriteMeals)
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }) => ({
          title: "Meal Categories",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName="ios-menu" onPress={() => {
                navigation.toggleDrawer()
              }} />
            </HeaderButtons>
          )
        })} />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoriesMeals}
        options={({ route }: any) => ({
          title: getCategoryMealsName(route.params.categoryId),
        })}
      />
      <Stack.Screen
        name="MealsDetails"
        component={MealDetails}
        options={({ route }: any) => ({
          title: getMealName(route.params.mealId, meals),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                title="Fav"
                iconName={favMeals.some((meal: any) => meal.id == route.params.mealId) ? "ios-star" : "ios-star-outline"}
                onPress={() => {
                  dispatch(toggleFavorite(route.params.mealId))
                }} />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={defaultStackNavOptions}>
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={({ route }) => ({
        title: 'Your favorites'
      })} />
    <Stack.Screen name="MealDetail" component={MealDetails} />
  </Stack.Navigator>
);

const FiltersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Filters"
      screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={({ navigation, route }: any) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName="ios-menu" onPress={() => {
                navigation.toggleDrawer()
              }} />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item title="Menu" iconName="ios-save" onPress={() => {
                route.params?.save()
              }} />
            </HeaderButtons>
          )

        })}
      />
    </Stack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      activeColor={Colors.accent}
      barStyle={{ backgroundColor: '#ffffff' }}
      shifting={true}

    >
      <Tab.Screen
        name="Meals"
        component={MealsStack}
        options={{
          tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-restaurant' color={tabInfo.color} size={25} />
          }
        }} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-star' color={tabInfo.color} size={25} />
          }
        }} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();
export default () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Tabs}
          options={{
            title: 'Home',
          }}

        />
        <Drawer.Screen
          name="Filters"
          component={FiltersStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


