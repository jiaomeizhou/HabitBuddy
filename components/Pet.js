import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Styles } from './Styles';
import { auth } from '../firebase-files/firebaseSetup';
import { updateUserData } from '../firebase-files/firestoreHelper';
import PressableItem from './PressableItem';
import PetMessage from './PetMessage';
import * as Colors from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Chip, Dialog, Portal, Button } from 'react-native-paper';

// The Pet component displays the pet image and status.
// It also shows a dialog with a dog fact when the user pets the pet.
export default function Pet({ userProgress }) {
    const [showPetMessage, setShowPetMessage] = useState(false);
    const petStatus = userProgress > 70 ? 'happy' : userProgress > 30 ? 'normal' : 'sad';
    const [statusText, setStatusText] = useState('');

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
                return "You are doing great! I'm so happy!";
            case 'normal':
                return 'Keep it up! I believe in you.';
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
        setStatusText(getPetStatusText(petStatus));
    }, [userProgress]);

    // Handle press event on pet, when the user wants to pet the pet,
    // show a random dog fact (fetch from API).
    function handlePressPet() {
        setShowPetMessage(true);
    }

    // Hide the pet message dialog
    function hidePetMessage() {
        setShowPetMessage(false);
    }

    return (
        <PressableItem onPress={handlePressPet}>
            <Portal>
                <Dialog visible={showPetMessage} onDismiss={hidePetMessage} style={Styles.petMessageDialog}>
                    <Dialog.Title>{statusText}</Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            Here is a dog fact:
                        </Text>
                    </Dialog.Content>
                    <Dialog.Content>
                        <PetMessage />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hidePetMessage} textColor={Colors.chestnut}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View >
                <AnimatedCircularProgress
                    size={200}
                    width={15}
                    fill={userProgress}
                    tintColor={Colors.fernGreen}
                    backgroundColor={Colors.lightGrey}
                    rotation={0}
                    padding={10}>
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

