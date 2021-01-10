import React, { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'

type OwnProps = {
  onHandleAddGoal: (goal: string, cb: Function) => void;
  showModal: boolean;
  onCancelAddGoal: () => void
}

function GoalInput({ onHandleAddGoal, onCancelAddGoal, showModal }: OwnProps) {
  const [enteredGoal, setEnteredGoal] = useState('');

  const handleChangeText = (text: string) => {
    setEnteredGoal(text)
  };

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput placeholder="Course goals" style={styles.input} value={enteredGoal}
                   onChangeText={handleChangeText} />
        <View style={styles.actionContainer}>
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={onCancelAddGoal} />
          </View>
          <View style={styles.button}>
            <Button
              title="Add goal"
              onPress={() => onHandleAddGoal(enteredGoal, setEnteredGoal)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%'
  },
  button: {
    width: '40%'
  }
});

export default GoalInput
