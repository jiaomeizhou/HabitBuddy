import { View, Text, Image } from 'react-native';
import React from 'react';
import { Styles } from './Styles';
import ProgressBar from './ProgressBar';

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
                return 'Keep it up! Dobby is so happy!';
            case 'normal':
                return 'Dobby needs a little love. Keep checking in!';
            case 'sad':
                return 'Dobby is sad. Keep checking in!';
            default:
                return '';
        }
    }

    return (
        <View style={Styles.petContainer}>
            <Image source={getImageSource(petStatus)} style={Styles.petImage} />
            <Text style={Styles.statusText}>
                {getPetStatusText(petStatus)}
            </Text>
            <ProgressBar progress={userProgress} label={`Dobby is a ${petStatus} Dog`} />
        </View>
    );
}

