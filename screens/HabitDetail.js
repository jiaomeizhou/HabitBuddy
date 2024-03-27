import { View, Text, Button, Pressable} from 'react-native'
import React, {useEffect} from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

export default function HabitDetail({ route, navigation}) {

  const { habitObj } = route.params;
  console.log("this is habit detail", habitObj)

  useEffect(() => {
    navigation.setOptions(
      { 
        title: habitObj.habit,
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('EditHabit')}>
              <FontAwesome6 name="edit" size={24} color="black" />
          </Pressable>
      )
      });

  }, []);

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