import { View, Text, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Styles } from './Styles';
import ProgressBar from './ProgressBar';
import { auth } from '../firebase-files/firebaseSetup';
import { updateUserData } from '../firebase-files/firestoreHelper';
import PressableItem from './PressableItem';
import PetMessage from './PetMessage';

export default function Pet({ userProgress }) {
    const [showPetMessage, setShowPetMessage] = useState(false);
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

    // Handle press event on pet, when the user wants to pet the pet,
    // show a random dog fact (fetch from API) for 5 seconds.
    function handlePressPet() {
        setShowPetMessage(true);
        setTimeout(() => {
            setShowPetMessage(false);
        }, 5000); // 5 seconds
        Alert.alert('Pet', getPetStatusText(petStatus));
    }

    return (
        <PressableItem onPress={handlePressPet}>
            {showPetMessage && <PetMessage />}
            <Image source={getImageSource(petStatus)} style={Styles.image} />
            <ProgressBar progress={userProgress} />
        </PressableItem>
    );
}

