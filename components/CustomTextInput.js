import { TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Styles } from '../components/Styles';

// The CustomTextInput component is a wrapper around the TextInput component.
export default function CustomTextInput({ style, ...props }) {
    return (
        <TextInput
            style={[Styles.input, style]}
            {...props}
        />
    )
}