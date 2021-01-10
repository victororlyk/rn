import React, { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import colors from "../constants/colors"
import Input from '../components/Input'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import BaseButton from '../components/BaseButton'

type OwnProps = {
  onStartGameHandler: (selectedNumber: number) => void
}
const StartGame: React.FC<OwnProps> = ({ onStartGameHandler }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(null);

  const numberInputHandler = (text: string) => {
    setEnteredValue(text.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmButtonHandler = () => {
    const chosenNumber = parseInt(enteredValue, 10)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'number has to be a number between 1 and 99', [{
        text: 'ok',
        style: 'destructive',
        onPress: resetInputHandler
      }])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card otherStyles={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <BaseButton onPress={() => {
          onStartGameHandler(selectedNumber)
        }}>START GAME</BaseButton>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New game!</Text>
        <Card otherStyles={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            otherStyles={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.actionContainer}>
            <View style={styles.button}>
              <Button title='Reset' onPress={resetInputHandler} color={colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' onPress={confirmButtonHandler} color={colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: 50
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGame;
