import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import * as Colors from './Colors';

export default function PressableButton({ title, onPress, color, disabled = false, customStyle, textColor }) {
    return (
        <Pressable
            android_ripple={styles.andriodPressed}
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: disabled ? 'grey' : color },
                pressed && styles.pressed,
                customStyle,
            ]}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
    andriodPressed: {
        backgroundColor: 'gray',
    },
})