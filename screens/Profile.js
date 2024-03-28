import { View, Text, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome5 } from '@expo/vector-icons';
import { updateProfile } from "firebase/auth";
import Stats from '../components/Stats';
import ProfileInput from "../components/ProfileInput";

export default function Profile({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(auth.currentUser.name || '');
  const [photoURL, setphotoURL] = useState(auth.currentUser.photoURL || '');


  async function saveProfileHandler(name) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    }
    catch (error) {
      console.error(error);
    }
    setIsModalVisible(false);
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  navigation.setOptions({
    headerRight: () => (
      <FontAwesome5 name="user-edit" size={24} color="black" onPress={() => setIsModalVisible(true)} />
    ),
  });

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View>
        {auth.currentUser.photoURL ? (
          <Image source={{ uri: auth.currentUser.photoURL }} style={{ width: 100, height: 100, marginTop: 10 }} />)
          :
          (<FontAwesome5 name="user-circle" size={100} color="black" />
          )}
        <ProfileInput inputHandler={saveProfileHandler} modalVisible={isModalVisible} dismissModal={dismissModal} />
        <Text>ID: {auth.currentUser.uid}</Text>
        <Text>Name: {auth.currentUser.displayName}</Text>
        <Text>Email: {auth.currentUser.email}</Text>
      </View>
      <Stats />
    </View>

  );
}
