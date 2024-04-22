import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import * as Colors from './Colors';
import { Styles } from './Styles';

// This component creates a customizable Pressable button.
// It allows for custom colors, text, styles, and handling of press events.
export default function PressableButton({ title, onPress, color, disabled = false, customStyle, textColor }) {
    return (
        <Pressable
            android_ripple={Styles.andriodPressed}
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                Styles.pressableButtons,
                { backgroundColor: disabled ? Colors.grey : color },
                pressed && Styles.buttonPressed,
                customStyle,
            ]}
        >
            <Text style={[Styles.pressableButtonText, { color: textColor }]}>{title}</Text>
        </Pressable>
    )
}