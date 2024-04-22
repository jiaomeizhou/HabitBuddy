import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { updateUserData } from '../firebase-files/firestoreHelper';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase-files/firebaseSetup';
import ImageManager from '../components/ImageManager';
import { Styles } from '../components/Styles';
import PressableButton from '../components/PressableButton';
import * as Colors from '../components/Colors';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from 'react-native-paper';

// The EditProfile screen of Habit Buddy app.
// It allows the user to edit their profile.
export default function EditProfileScreen({ navigation, route }) {
    // Get user profile data from the route params
    const userData = route.params.userProfile ?? {};
    const [userName, setUserName] = useState(userData.userName || '');
    const [petName, setPetName] = useState(userData.petName || '');
    const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl || '');
    const [showImageButtons, setShowImageButtons] = useState(false);

    // Function to upload image to Firebase Storage
    async function getImageData(uri) {
        try {
            const response = await fetch(uri);
            const imageBlob = await response.blob();
            const imageName = uri.substring(uri.lastIndexOf("/") + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytes(imageRef, imageBlob);
            return await getDownloadURL(uploadResult.ref);
        } catch (err) {
            Alert.alert('Upload Error', 'Failed to upload image.');
            console.error(err);
            return null;
        }
    }

    // Function to handle avatar upload
    async function handleAvatarUpload(uri) {
        try {
            const uploadedImageUrl = await getImageData(uri);
            if (uploadedImageUrl) {
                setAvatarUrl(uploadedImageUrl);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    // Function to update user profile
    const saveProfile = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: avatarUrl,
            });
            await updateUserData(auth.currentUser.uid, {
                userName: userName,
                petName: petName,
                avatarUrl: avatarUrl,
            });
            navigation.goBack(); // Redirect after saving
        } catch (error) {
            console.error(error);
        }
    };

    // Toggle the visibility of image management buttons.
    function imageButtonHandler() {
        setShowImageButtons(!showImageButtons);
    }

    // Dismiss the image picker UI.
    function dismissImagePicker() {
        setShowImageButtons(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button mode="elevated" icon='account-box' iconColor={avatarUrl ? Colors.indigoDye : Colors.feldGrau} onPress={() => imageButtonHandler()} >Update Avatar</Button>
            <ImageManager receiveImageURI={handleAvatarUpload} initialImage={avatarUrl} showImageButtons={showImageButtons} dismissImagePicker={dismissImagePicker} />
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
            <PressableButton
                title="Save"
                onPress={saveProfile}
                color={Colors.fernGreen}
                customStyle={Styles.pressableButton}
                textColor={Colors.white}
            />
            <PressableButton
                title="Cancel"
                onPress={() => navigation.goBack()}
                color={Colors.white}
                customStyle={Styles.pressableButton}
                textColor={Colors.fernGreen}
            />
        </View>
    );
}
