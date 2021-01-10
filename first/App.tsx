import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState<Record<string, string>[]>([])
  const [showModal, setShowModal] = useState(false)

  const handleDelete = (goalId: string) => {
    console.log(goalId, courseGoals, 'before')
    setCourseGoals(prevState => {
      return prevState.filter(goal => goal.id !== goalId)
    })
    console.log(courseGoals, 'here after')
  }

  const handleAddGoal = (goal: string, cb: Function) => {
    if (goal.length === 0) {
      return;
    }
    setCourseGoals(prevState => {
      return [...prevState, {
        id: Math.random()
                .toString(),
        value: goal
      }]
    })
    cb('')
    setShowModal(false)
  };

  const cancelAddGoal = () => {
    setShowModal(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => {
        setShowModal(true)
      }} />
      <GoalInput onHandleAddGoal={handleAddGoal} showModal={showModal} onCancelAddGoal={cancelAddGoal} />
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem id={itemData.item.id} onDelete={handleDelete} title={itemData.item.value} />)}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
