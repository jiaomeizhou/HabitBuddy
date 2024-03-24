import { View, Text, Image } from 'react-native'
import React from 'react'
import { Styles } from './Styles'
import ProgressBar from './ProgressBar'

export default function Pet() {
    // TODO: replace it when we can read data from firebase, for now, we will hardcode it
    const user = {
        pet: {
            name: 'Toby',
            progrss: 30,
            status: 'puppy',
        },
    }
    return (
        <View style={Styles.petContainer}>
            <Image source={require('../assets/pet.jpg')} style={Styles.petImage} />
            <ProgressBar progress={user.pet.progrss} label={`${user.pet.name} is a ${user.pet.status}`}/>
        </View>
    )
}