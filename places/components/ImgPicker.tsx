import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors'

type OwnProps = {
  onImageTaken: any
}
const ImgPicker: React.FC<OwnProps> = ({ onImageTaken }) => {

  const [pickedImage, setPickedImage] = useState('')

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)
    if (result.status !== 'granted') {
      Alert.alert('insufficient persmission!', 'you need to grand permisnion', [{ text: 'Okay' }])
      return false
    }
    return true;
  };

  const takeImage = async () => {
    const isAllowed = await verifyPermissions()
    if (!isAllowed) {
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: true,
      aspect: [16, 9],
      quality: .5
    })
    setPickedImage(result.uri)
    onImageTaken(result.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage
          ? <Text>NO image pciker yet.</Text>
          : <Image style={styles.image} source={{ uri: pickedImage }} />
        }
      </View>
      <Button title="Take Image" color={Colors.primary} onPress={takeImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 3
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
