import { View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome5 } from '@expo/vector-icons';
import Stats from '../components/Stats';
import { getUserProfileFromDB } from '../firebase-files/firestoreHelper';
import { Styles } from '../components/Styles';
import * as Colors from '../components/Colors';
import { IconButton } from 'react-native-paper';
import { signOut } from "firebase/auth";
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Profile({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={onPressEdit} icon="account-edit" size={28}/>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getUserProfileData() {
      if (!auth.currentUser) return;
      const profileData = await getUserProfileFromDB(auth.currentUser.uid);
      setUserProfile(profileData);
    }
    getUserProfileData();
  }, [userProfile]);

  // fetch updated user profile data from firestore
  const onPressEdit = async () => {
    try {
      const profileData = await getUserProfileFromDB(auth.currentUser.uid);
      navigation.navigate('EditProfile', { userProfile: profileData });
    } catch (error) {
      console.log("Error fetching updated userProfile: ", error);
    }
  };

  // log out handler
  async function onPressLogOut() {
    try {
      await signOut(auth);
      // After successful sign-out, navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.log("Error signing out: ", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  }

  return (
    <View style={Styles.container}>
      {auth.currentUser &&
        <Card style={Styles.profileCard}>
          {userProfile && userProfile.avatarUrl ? (
            <Image source={{ uri: userProfile.avatarUrl }} style={Styles.image} />)
            :
            (<FontAwesome5 name="user-circle" size={150} color={Colors.silver} />
            )}
          <Card.Content style={Styles.profileText}>
            <Text style={Styles.nameText} >{auth.currentUser.displayName}</Text>
            <Text>{auth.currentUser.email}</Text>
            <Text>Pet name: {userProfile?.petName || ''}</Text>
            <Text>Pet status: {userProfile?.petStatus || ''}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onPressLogOut} icon="logout" mode="elevated" textColor={Colors.chestnut} >Log out</Button>
          </Card.Actions>
        </Card>
      }
      <Stats />
    </View>

  );
}
