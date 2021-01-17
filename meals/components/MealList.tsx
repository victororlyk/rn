import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MealItem from './MealItem'


const renderItemData = (navigate: any, { item: { title, duration, complexity, affordability, imageUrl, id } }: any) => {
  const select = () => {
    navigate({ name: 'MealsDetails', params: { mealId: id } })
  }

  return <MealItem
    title={title}
    onSelect={select}
    duration={duration}
    complexity={complexity}
    affordability={affordability}
    image={imageUrl} />
}

type OwnProps = {
  listData: any[];
  navigate: any
}
const MealList: React.FC<OwnProps> = ({ listData, navigate }) => {
  return (
    <View style={styles.list}>
      <FlatList data={listData} renderItem={renderItemData.bind(null, navigate)} style={{ width: '100%' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealList;
