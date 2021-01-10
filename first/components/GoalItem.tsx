import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type OwnProps = {
  title: string;
  onDelete: (goal: string) => void;
  id: string;
}

function GoalItem<FC>({ title, onDelete, id }: OwnProps) {
  return (
    <TouchableOpacity activeOpacity={.6} onPress={() => onDelete(id)}>
      <View style={styles.listItem}><Text>{title}</Text></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
})

export default GoalItem
