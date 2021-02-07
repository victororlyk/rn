import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import { loadPlaces } from '../store/actions/places'

type OwnProps = {}
const PlacesList: React.FC<OwnProps> = ({ navigation }) => {
  const places = useSelector(state => state.places.places);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces())
  }, [])

  const seeDetails = (placeId: string, placeTitle: string) => {
    navigation.navigate('PlacesDetails', { placeTitle, placeId })
  }
  console.log(places, 'here places')
  return (
    <View>
      <Text>places list</Text>
      <FlatList data={places} renderItem={(itemData) => (
        <PlaceItem
          onSelect={seeDetails.bind(null, itemData.item.id, itemData.item.title)}
          image={itemData.item.imageURI}
          title={itemData.item.title}
          address={null} />
      )} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlacesList;
