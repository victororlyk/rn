import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/auth'

type OwnProps = {
  navigation: any;
}
const Startup: React.FC<OwnProps> = ({ navigation }) => {

  const dispatch = useDispatch();

  const tryLogin = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      navigation.navigate("Auth")
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expDate } = transformedData;
    const exirationpDate = new Date(expDate);
    if (exirationpDate <= new Date() || !token || !userId) {
      navigation.navigate("Auth")
      return
    }

    navigation.navigate("Shop");
    dispatch(login({ token, userId, expDate }))
  }, [])

  useEffect(() => {
    tryLogin()
  }, [tryLogin])
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary}>

      </ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Startup;
