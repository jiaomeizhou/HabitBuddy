import { Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function IconButton({ onPress, children }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
})