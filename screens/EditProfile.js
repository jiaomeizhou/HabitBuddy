import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { updateUserData } from '../firebase-files/firestoreHelper';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase-files/firebaseSetup';

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
            });
            // Redirect to profile screen after saving
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle avatar upload or selection
    const handleAvatarUpload = () => {
        // Implement avatar upload logic (e.g., using react-native-image-picker)
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                placeholder="Pet Name"
                value={petName}
                onChangeText={setPetName}
            />
            <Button title="Upload Avatar" onPress={handleAvatarUpload} />
            {avatarUrl && <Image source={{ uri: avatarUrl }} style={{ width: 100, height: 100 }} />}
            <Button title="Save" onPress={saveProfile} />
        </View>
    );
}
