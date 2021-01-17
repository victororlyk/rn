import React from 'react';
import { useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, View } from 'react-native'

import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

type OwnProps = {
  navigation: StackNavigationProp<any>
}
const Favorites: React.FC<OwnProps> = ({ navigation: { navigate } }) => {
  const favoriteMeals = useSelector((state: any) => state.meals.favoriteMeals)
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>
          No favorites found
        </DefaultText>
      </View>
    )
  }
  return <MealList listData={favoriteMeals} navigate={navigate} />
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Favorites;
