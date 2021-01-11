import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors'

type OwnProps = {
  title: string;
}

const Header: React.FC<OwnProps> = ({ title }) => {
  return (
    <View style={{ ...styles.header, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'android' ? colors.primary : colors.accent,
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  headerIOS: {
    backgroundColor: colors.accent,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: Platform.OS === 'ios' ? '#ccc' : 'white',

  }
});

export default Header;
