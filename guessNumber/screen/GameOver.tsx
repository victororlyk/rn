import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors'
import BaseButton from '../components/BaseButton'

type OwnProps = {
  numberOfRounds: number;
  userNumber: number;
  configureNewGameHandler: () => void;
}
const GameOver: React.FC<OwnProps> = ({ numberOfRounds, userNumber, configureNewGameHandler }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Game is over</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/success.png')} />
        </View>
        <View style={styles.resultContainer}>
          <Text style={{ ...DefaultStyles.bodyText, ...styles.resultText }}> Number of rounds:
            <Text style={styles.highlight}> {numberOfRounds}</Text> Number was:
            <Text style={styles.highlight}> {userNumber}</Text>
          </Text>
        </View>
        <BaseButton onPress={configureNewGameHandler}>NEW GAME</BaseButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    borderRadius: Dimensions.get('window').width * .7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    marginHorizontal: Dimensions.get('window').height / 40
  },
  resultText: {
    textAlign: 'center'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOver;
