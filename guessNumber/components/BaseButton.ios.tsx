import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors'

type OwnProps = {
  children: React.ReactNode;
  onPress: Function
}

const BaseButton: Reect.FC<OwnProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity startOpacity={.6} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
