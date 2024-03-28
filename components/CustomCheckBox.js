import { StyleSheet, View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import CustomText from './CustomText'

export default function CustomCheckBox({ text, value, onValueChange }) {
    return (
        <View style={styles.section}>
            <CustomText style={styles.paragraph}>{text}</CustomText>
            <Checkbox style={styles.checkbox} value={value} onValueChange={onValueChange} />
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 12,
        padding: 5,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'black',

    },
    checkbox: {
        marginLeft: 10,
    },
})