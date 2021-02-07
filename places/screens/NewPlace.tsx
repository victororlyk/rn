import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import { addPlace } from '../store/actions/places'
import ImgPicker from '../components/ImgPicker'

type OwnProps = {}
const NewPlace: React.FC<OwnProps> = ({ navigation }) => {
  const [placeName, setPlaceName] = useState('');
  const [imageURI, setImageURI] = useState('');
  const dispatch = useDispatch();

  const changeName = (name) => {
    setPlaceName(name)
  }

  const savePlace = () => {
    dispatch(addPlace(placeName, imageURI));
    setPlaceName('');
    setImageURI('');
    navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>title</Text>
        <TextInput value={placeName} style={styles.input} onChangeText={changeName} />
        <ImgPicker onImageTaken={setImageURI} />
        <Button title="Save place" color={Colors.primary} onPress={savePlace} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
    padding: 15,
    marginBottom: 15,
  }
});

export default NewPlace;
