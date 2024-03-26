import { TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomTextInput({ style, ...props }) {
    return (
        <TextInput
            style={[styles.input, style]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 2,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'black',
    },
})