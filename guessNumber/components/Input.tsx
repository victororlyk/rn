import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type OwnProps = {
  otherStyles?: Record<string, any>
  other?: any[]
};

const Input: React.FC<OwnProps> = ({ otherStyles, ...other }) => {
  return (
    <TextInput {...other} style={{ ...styles.input, ...otherStyles }} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default Input;
