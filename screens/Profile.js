import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome5 } from '@expo/vector-icons';
import Stats from '../components/Stats';
import { getUserProfileFromDB } from '../firebase-files/firestoreHelper';
import { Styles } from '../components/Styles';
import * as Colors from '../components/Colors';

export default function Profile({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome5 name="user-edit" size={24} color="black" onPress={onPressEdit} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getUserProfileData() {
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

  return (
    <View style={Styles.container}>
      {auth.currentUser && auth.currentUser.photoURL ? (
        <Image source={{ uri: auth.currentUser.photoURL }} style={Styles.image} />)
        :
        (<FontAwesome5 name="user-circle" size={100} color="black" />
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
    </View>

  );
}
