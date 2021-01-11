import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors'

type OwnProps = {
  children: React.ReactNode;
  onPress: Function
}

const BaseButton: Reect.FC<OwnProps> = ({ children, onPress }) => {
  let ButtonComponent = TouchableOpacity
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent startOpacity={.6} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 23,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'open-sans',
    fontSize: 18,
  }
});

export default BaseButton;
