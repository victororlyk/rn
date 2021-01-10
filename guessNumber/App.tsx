import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';

import Header from './components/Header'
import StartGame from './screen/StartGame'
import GameScreen from './screen/GameScreen'
import GameOver from './screen/GameOver'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(null);
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(0)
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber)
    setGuessRounds(null)
  }

  const gameOverHandler = (rounds: number) => {
    setGuessRounds(rounds)
  }

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} />
  }

  let content = <StartGame onStartGameHandler={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOverHandler={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver numberOfRounds={guessRounds} userNumber={userNumber}
                        configureNewGameHandler={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
