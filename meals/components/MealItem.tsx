import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DefaultText from './DefaultText'

type OwnProps = {
  title: string;
  onSelect: () => void;
  duration: number;
  complexity: string;
  affordability: string;
  image: string
}
const MealItem: React.FC<OwnProps> = ({ title, onSelect, duration, complexity, affordability, image }) => {
  return (
    <View style={styles.mealItem}><TouchableOpacity onPress={onSelect}>
      <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
        <ImageBackground source={{ uri: image }} style={styles.bgImage}>
          <View style={styles.titleContainer}><Text style={styles.title} numberOfLines={1}>{title}</Text></View>
        </ImageBackground>
      </View>
      <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
        <DefaultText>{duration}m</DefaultText>
        <DefaultText>{complexity.toUpperCase()}</DefaultText>
        <DefaultText>{affordability}</DefaultText>
      </View>
    </TouchableOpacity></View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center'
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  }
});

export default MealItem;
