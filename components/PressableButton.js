import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({ title, onPress, color, disabled = false }) {
    return (
        <Pressable
            android_ripple={styles.andriodPressed}
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: disabled ? 'grey' : color },
                pressed && styles.pressed
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '40%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    pressed: {
        opacity: 0.75,
    },
    andriodPressed: {
        backgroundColor: 'gray',
    },
})