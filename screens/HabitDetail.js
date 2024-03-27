import { View, Text, Button} from 'react-native'
import React from 'react'

export default function HabitDetail({ route, navigation}) {
  const { habitObj } = route.params;
  console.log("this is habit detail", habitObj)

  function handleCheckinButton({habitObj}) {
    navigation.navigate('Checkin', {habitObj: habitObj})
  }
  return (
    <View>
      <Text>{habitObj.habit}</Text>
      <Button title="Check in" onPress={handleCheckinButton} />
    </View>
  )
}