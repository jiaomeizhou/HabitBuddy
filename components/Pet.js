import { View, Text, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { Styles } from './Styles';
import ProgressBar from './ProgressBar';
import { auth } from '../firebase-files/firebaseSetup';
import { updateUserData } from '../firebase-files/firestoreHelper';
import PressableItem from './PressableItem';

export default function Pet({ userProgress }) {
    // TODO: consider if it's necessary to store the pet in the database
    // do we need to allow user rename their pet?
    const petStatus = userProgress > 70 ? 'happy' : userProgress > 30 ? 'normal' : 'sad';

    // Helper function to get the image source based on pet status
    function getImageSource(status) {
        switch (status) {
            case 'happy':
                return require('../assets/PetStatus/happy_dog.jpg');
            case 'normal':
                return require('../assets/PetStatus/normal_dog.jpg');
            case 'sad':
                return require('../assets/PetStatus/sad_dog.jpg');
            default:
                return null;
        }
    }

    // Helper function to get the status text based on pet status
    function getPetStatusText(status) {
        switch (status) {
            case 'happy':
                return "Keep it up! I'm so happy!";
            case 'normal':
                return 'I needs a little love. Keep checking in!';
            case 'sad':
                return "I'm sad. Keep checking in!";
            default:
                return '';
        }
    }

    // update pet status to user profile
    useEffect(() => {
        async function updateUserPetStatus() {
            await updateUserData(auth.currentUser.uid, { petStatus: petStatus });
        }
        updateUserPetStatus();
    }, [userProgress]);

    function handlePressPet() {
        Alert.alert('Pet', getPetStatusText(petStatus));
    }

    return (
        <PressableItem onPress={handlePressPet}>
            <Image source={getImageSource(petStatus)} style={Styles.image} />
            {/* <Text style={Styles.statusText}>
                {getPetStatusText(petStatus)}
            </Text> */}
            <ProgressBar progress={userProgress} />
        </PressableItem>
    );
}

