import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { updateUserData } from '../firebase-files/firestoreHelper';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase-files/firebaseSetup';
import ImageManager from '../components/ImageManager';
import { Styles } from '../components/Styles';
import PressableButton from '../components/PressableButton';
import * as Colors from '../components/Colors';

export default function EditProfileScreen({ navigation, route }) {
    const userData = route.params.userProfile ?? {};
    const [userName, setUserName] = useState(userData.userName || '');
    const [petName, setPetName] = useState(userData.petName || '');
    const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl || '');

    // Function to update user profile
    const saveProfile = async () => {
        try {
            // Update profile using Firebase Auth updateProfile method
            await updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: avatarUrl,
            });
            await updateUserData(auth.currentUser.uid, {
                userName: userName,
                petName: petName,
                avatarUrl: avatarUrl,
            });
            // Redirect to profile screen after saving
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle avatar upload
    function handleAvatarUpload(uri) {
        setAvatarUrl(uri);
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageManager receiveImageURI={handleAvatarUpload} initialImage={avatarUrl} />
            <TextInput
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
                style={Styles.input}
            />
            <TextInput
                placeholder="Pet Name"
                value={petName}
                onChangeText={setPetName}
                style={Styles.input}
            />
            <PressableButton title="Save" onPress={saveProfile} color={Colors.fernGreen} customStyle={Styles.pressableButton} textColor={Colors.white} />
            <PressableButton title="Cancel" onPress={() => navigation.goBack()} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
        </View>
    );
}
