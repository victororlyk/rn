import React from 'react';
import { useSelector } from 'react-redux'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import DefaultText from '../components/DefaultText'

const ListItem = (item: string) => {
  return <View style={styles.listItem}><DefaultText key={item}>{item}</DefaultText></View>
}
type OwnProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, any>
}
const MealsDetails: React.FC<OwnProps> = ({ route, navigation }) => {
  const meals = useSelector((state: any) => state.meals.meals)
  const mealId = route.params?.mealId ?? 'no id';
  const selectedMeal = meals.find(({ id }: any) => id === mealId)
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal?.duration}m</DefaultText>
        <DefaultText>{selectedMeal?.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal?.affordability}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredtients</Text>
      {selectedMeal?.ingredients?.map(ListItem)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps?.map(ListItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealsDetails;
