import { View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import CustomText from './CustomText'
import * as Colors from './Colors'
import { Styles } from './Styles'

// Defines a reusable custom checkbox component with an optional text label.
export default function CustomCheckBox({ text, value, onValueChange }) {
    return (
        <View style={Styles.customCheckBoxSection}>
            {text && <CustomText style={Styles.customParagraph}>{text}</CustomText>}
            <Checkbox style={Styles.customCheckBox} value={value} onValueChange={onValueChange} color={Colors.fernGreen} />
        </View>
    )
}
