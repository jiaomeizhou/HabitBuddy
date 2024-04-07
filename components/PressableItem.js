import { Pressable, Platform } from 'react-native'
import React from 'react'
import { Styles } from './Styles'
import * as Colors from './Colors'

// This component is a pressable item, provide a feedback when pressed
export default function PressableItem({ onPress, children, style }) {
    const androidRipple = Platform.OS === 'android' ? { color: Colors.white } : {};
    return (
        <Pressable
            onPress={onPress}
            android_ripple={androidRipple}
            style={({ pressed }) => [
                pressed && Styles.pressedView,
                style
            ]}>
            {children}
        </Pressable>)
}