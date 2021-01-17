import React from 'react';
import { FlatList, StyleSheet, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'

const renderGridItem = (navigate: any, itemData: any) => {

  const select = ()=>{
    navigate({
      name: 'CategoryMeals', params: {
        categoryId: itemData.item.id,
      }
    })
  }
  return <CategoryGridTile
    onSelect={select}
    color={itemData.item.color}
    title={itemData.item.title}
  />
}

type OwnProps = {
  navigation: StackNavigationProp<any>
}

const Categories: React.FC<OwnProps> = ({ navigation: { navigate } }) => {
  return (
    <FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem.bind(null, navigate)} />
  );
};


const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default Categories;
