import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import defaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BaseButton from '../components/BaseButton'


const renderListItem = (value: number, numOfRound: number) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>{value}</Text>
    </View>
  )
}
const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

type OwnProps = {
  userChoice: number;
  onGameOverHandler: (rounds: number) => void
}

const GameScreen: React.FC<OwnProps> = ({ userChoice, onGameOverHandler }) => {
  const min = useRef(1);
  const max = useRef(100)
  const initialGuess = generateRandomBetween(min.current, max.current, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height)


  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height)
      setDeviceWidth(Dimensions.get('window').width)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)

    }
  }, [])
  useEffect(() => {
    if (currentGuess === userChoice) {
      Alert.alert('win');
      onGameOverHandler(pastGuesses.length)
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction: string) => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('it is not true', 'play well ', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      max.current = currentGuess;
    } else if (direction === 'greater') {
      min.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(min.current, max.current, currentGuess)
    setPastGuesses((prevState => [nextNumber, ...prevState]))
    setCurrentGuess(nextNumber);
  }

  let listContainerStyles = styles.listContainer;
  if (deviceWidth < 300) {
    listContainerStyles = styles.listContainerBig
  }

  if (deviceHeight< 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.controls}><BaseButton onPress={nextGuessHandler.bind(null, 'lower')}> <Ionicons
          name="md-remove" size={24}
          color="#fff" /></BaseButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <BaseButton onPress={nextGuessHandler.bind(null, 'greater')}><Ionicons name="md-add" size={24}
                                                                                 color="#fff" /></BaseButton></View>
        <View style={listContainerStyles}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index, arr) => renderListItem(guess, arr.length - index))}
          </ScrollView>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card otherStyles={styles.buttonContainer}>
        <BaseButton onPress={nextGuessHandler.bind(null, 'lower')}> <Ionicons name="md-remove" size={24} color="#fff" /></BaseButton>
        <BaseButton onPress={nextGuessHandler.bind(null, 'greater')}><Ionicons name="md-add" size={24}
                                                                               color="#fff" /></BaseButton>
      </Card>
      <View style={listContainerStyles}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index, arr) => renderListItem(guess, arr.length - index))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  },
  listContainer: {
    width: '60%',
    flex: 1
  },
  listContainerBig: {
    width: '80%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  }

});

export default GameScreen;
