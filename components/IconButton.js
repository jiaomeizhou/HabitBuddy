import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Styles } from './Styles';

export default function IconButton({ onPress, children }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && Styles.pressed}
        >
            {children}
        </Pressable>
    )
}
