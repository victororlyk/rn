import React from 'react';
import { useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View } from 'react-native'

import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'


type OwnProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, any>
}
const CategoriesMeals: React.FC<OwnProps> = ({ navigation: { navigate }, route }) => {
  const meals = useSelector((state: any) => state.meals.filteredMeals)
  const catId = route.params?.categoryId ?? null
  const displayedMeals = meals.filter((el: any) => el.categoriesIds.includes(catId));

  if (!displayedMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>no meals found, maybe check your filters</DefaultText>
      </View>
    )
  }
  return <MealList listData={displayedMeals} navigate={navigate} />
};


const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoriesMeals;
