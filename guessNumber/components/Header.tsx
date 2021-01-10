import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors'

type OwnProps = {
  title: string;
}

const Header: React.FC<OwnProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
});

export default Header;
