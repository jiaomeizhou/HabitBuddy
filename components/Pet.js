import { View, Text, Image } from 'react-native'
import React from 'react'
import { Styles } from './Styles'

export default function Pet() {
    return (
        <View style={Styles.petContainer}>
            <Image source={require('../assets/pet.jpg')} style={Styles.petImage} />
            <Text>Pet status: healthy</Text>
        </View>
    )
}