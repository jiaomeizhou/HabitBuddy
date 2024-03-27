import { View, Text } from 'react-native'
import React from 'react'

export default function HabitDetail({ route}) {
  const { habitObj } = route.params;

  return (
    <View>
      <Text>{habitObj.habit}</Text>
    </View>
  )
}