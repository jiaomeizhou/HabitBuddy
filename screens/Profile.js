import { View, Text, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome5 } from '@expo/vector-icons';
import { updateProfile } from "firebase/auth";

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(auth.currentUser.name || '');
  const [photoURL, setphotoURL] = useState(auth.currentUser.photoURL || '');

  function profileEditHandler() {
    setIsEditing(true);
  }

  async function saveProfileHandler() {
    console.log(auth.currentUser)
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    }
    catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  }

  function exitEditHandler() {
    setIsEditing(false);
    // Reset name and photoURL to current user's data
    setName(auth.currentUser.displayName || '');
    setphotoURL(auth.currentUser.photoURL || '');
  }

  navigation.setOptions({
    headerRight: () => (
      <FontAwesome5 name="user-edit" size={24} color="black" onPress={profileEditHandler} />
    ),
  });

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {isEditing ? (
        <View>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
          />
          <TextInput
            placeholder="photoURL"
            value={photoURL}
            onChangeText={setphotoURL}
            style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
          />
          <Button title="Save" onPress={saveProfileHandler} />
          <Button title="Cancel" onPress={exitEditHandler} />
        </View>
      ) : (
        <View>
          <Text>Name: {auth.currentUser.displayName}</Text>
          <Text>Email: {auth.currentUser.email}</Text>
          {auth.currentUser.photoURL && (
            <Image source={{ uri: auth.currentUser.photoURL }} style={{ width: 100, height: 100, marginTop: 10 }} />
          )}
        </View>
      )}
    </View>
  );
}
