import { View, Text, Image } from 'react-native'
import React from 'react'
import { Styles } from './Styles'

export default function AppIntro() {
  return (
    <View>
      <Text style={Styles.nameText}>Welcome to Habit Buddy</Text>
      <Text style={Styles.profileText}>Build habits with a lovely virtual pet.</Text>
      <Image source={require('../assets/PetStatus/happy_dog.jpg')} style={Styles.image} />
    </View>
  )
}