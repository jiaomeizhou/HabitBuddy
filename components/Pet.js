import { View, Text, Image } from 'react-native'
import React from 'react'
import { Styles } from './Styles'
import ProgressBar from './ProgressBar'

export default function Pet() {
    return (
        <View style={Styles.petContainer}>
            <Image source={require('../assets/pet.jpg')} style={Styles.petImage} />
            <ProgressBar progress={30} label="Pet status: puppy" />
        </View>
    )
}