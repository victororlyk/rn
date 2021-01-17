import React from 'react';
import { StyleSheet, Text } from 'react-native';

type OwnProps = {
  children: React.ReactNode;
}
const DefaultText: React.FC<OwnProps> = ({ children }) => {
  return (
    <Text>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});

export default DefaultText;
