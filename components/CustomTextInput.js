import { TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Styles } from '../components/Styles';

export default function CustomTextInput({ style, ...props }) {
    return (
        <TextInput
            style={[Styles.input, style]}
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