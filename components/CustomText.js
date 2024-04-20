import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Styles } from '../components/Styles';

// The CustomText component is a wrapper around the Text component.
export default function CustomText({ style, children, ...rest }) {
    return (
        <View>
            <Text style={[Styles.label, style]} {...rest}>
                {children}
            </Text>
        </View>
    )
}