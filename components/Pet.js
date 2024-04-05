import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from './Styles'
import ProgressBar from './ProgressBar'

export default function Pet({ userProgress }) {
    console.log(userProgress);
    const petStatus = userProgress > 70 ? 'happy' : userProgress > 30 ? 'normal' : 'sad';

    return (
        <View style={Styles.petContainer}>
            {petStatus === 'happy' && <Image source={require('../assets/PetStatus/happy_dog.jpg')} style={Styles.petImage} />}
            {petStatus === 'normal' && <Image source={require('../assets/PetStatus/normal_dog.jpg')} style={Styles.petImage} />}
            {petStatus === 'sad' && <Image source={require('../assets/PetStatus/sad_dog.jpg')} style={Styles.petImage} />}
            
            <ProgressBar progress={userProgress} label={`Dobby is a ${petStatus} Dog`} />
        </View>
    )
}