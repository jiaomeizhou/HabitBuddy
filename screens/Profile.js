import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../firebase-files/firebaseSetup'

export default function Profile() {
  console.log("profile page, current user: " , auth.currentUser.email)
  return (
    <View>
      <Text>{auth.currentUser.uid}</Text>
      <Text>{auth.currentUser.email}</Text>
    </View>
  )
}