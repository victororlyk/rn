import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type OwnProps = {
  value: string;
  changeField: any;
  fieldName: string;
  error: boolean;
  errorMessage: string;
  label: string;
}
const Input: React.FC<OwnProps & any> = ({ value, changeField, fieldName, error, errorMessage, label, ...props }) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onChangeText={changeField.bind(null, fieldName)}
      />
      {!error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 200,
    marginVertical: 10,
    color: 'black'
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red'
  }
});

export default Input;
