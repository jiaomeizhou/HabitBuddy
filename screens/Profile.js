import { View, Text, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome5 } from '@expo/vector-icons';
import Stats from '../components/Stats';
import { getUserProfileFromDB } from '../firebase-files/firestoreHelper';
import { Styles } from '../components/Styles';
import * as Colors from '../components/Colors';
import IconButton from '../components/IconButton';
import { signOut } from "firebase/auth";
import PressableButton from '../components/PressableButton';

export default function Profile({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={onPressEdit}>
          <FontAwesome5 name="user-edit" size={22} color={Colors.feldGrau} style={Styles.iconButton} />
        </IconButton>
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
      {auth.currentUser && userProfile && userProfile.avatarUrl ? (
        <Image source={{ uri: userProfile.avatarUrl }} style={Styles.image} />)
        :
        (<FontAwesome5 name="user-circle" size={100} color={Colors.silver} />
        )}
      {auth.currentUser &&
        <View>
          <Text style={Styles.nameText}>{auth.currentUser.displayName}</Text>
          <Text style={Styles.profileText}>{auth.currentUser.email}</Text>
          <Text style={Styles.profileText}>Pet name: {userProfile?.petName || ''}</Text>
          <Text style={Styles.profileText}>Pet status: {userProfile?.petStatus || ''}</Text>
          {/* <Text style={Styles.profileText}>Total Progress: {userProfile?.totalProgress || ''}%</Text> */}
        </View>
      }
      <Stats />
      <PressableButton title="Log out" onPress={onPressLogOut} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
    </View>

  );
}
