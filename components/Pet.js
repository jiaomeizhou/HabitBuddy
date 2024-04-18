import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Styles } from './Styles';
import ProgressBar from './ProgressBar';
import { auth } from '../firebase-files/firebaseSetup';
import { updateUserData } from '../firebase-files/firestoreHelper';
import PressableItem from './PressableItem';
import PetMessage from './PetMessage';
import { Chip } from 'react-native-paper';
import * as Colors from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
        }, 10000);
    }

    return (
        <PressableItem onPress={handlePressPet}>
            {showPetMessage && <PetMessage />}
            <View style={Styles.petContainer}>
                <AnimatedCircularProgress
                    size={200}
                    width={15}
                    fill={userProgress}
                    tintColor={Colors.fernGreen}
                    backgroundColor={Colors.lightGrey}
                    rotation={0}>
                    {
                        (fill) => (
                            <Image source={getImageSource(petStatus)} style={Styles.image} />
                        )
                    }
                </AnimatedCircularProgress>
            </View>
            <Chip
                icon={() => (
                    <Icon name="paw" size={16} color={Colors.chestnut} />
                )}
                onPress={handlePressPet} style={Styles.chip} >Pet me!</Chip>
        </PressableItem>
    );
}

