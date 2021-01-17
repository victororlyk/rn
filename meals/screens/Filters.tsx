import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

type FilterSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string
}
const FiltersSwitch: React.FC<FilterSwitchProps> = ({ label, value, onChange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{ false: '#ccc', true: Colors.primary }}
        thumbColor={Colors.accent}
        value={value}
        onValueChange={onChange} />
    </View>
  )
}
type OwnProps = {
  navigation: StackNavigationProp<any>
}
const Filters: React.FC<OwnProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    dispatch(setFilters(appliedFilters))
  }, [
    isGlutenFree,
    isLactoseFree,
    isVegan,
    isVegetarian
  ])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.list}>
      <Text style={styles.title}>Available Filters/ Restrictions</Text>
      <FiltersSwitch
        label='Gluten-free'
        value={isGlutenFree}
        onChange={(newValue: boolean) => setIsGlutenFree(newValue)} />
      <FiltersSwitch
        label='Lactose-free'
        value={isLactoseFree}
        onChange={(newValue: boolean) => setIsLactoseFree(newValue)} />
      <FiltersSwitch
        label='Vegan'
        value={isVegan}
        onChange={(newValue: boolean) => setIsVegan(newValue)} />
      <FiltersSwitch
        label='Vegetatian'
        value={isVegetarian}
        onChange={(newValue: boolean) => setIsVegetarian(newValue)} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    margin: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  filterContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  }
});

export default Filters;
