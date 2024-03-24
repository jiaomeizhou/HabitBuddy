import { Pressable, Platform } from 'react-native'
import React from 'react'
import { Styles } from './Styles'
import * as Colors from './Color'

// This component is a pressable item, provide a feedback when pressed
export default function PressableItem({ onPress, children }) {
    const androidRipple = Platform.OS === 'android' ? { color: Colors.primaryWhiteColor } : {};
    return (
        <Pressable onPress={onPress} android_ripple={androidRipple} style={({ pressed }) => [pressed && Styles.pressedView]}>
            {children}
        </Pressable>)
}