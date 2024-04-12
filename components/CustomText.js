import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Styles } from '../components/Styles';

export default function CustomText({ style, children, ...rest }) {
    return (
        <View>
            <Text style={[Styles.label, style]} {...rest}>
                {children}
            </Text>
        </View>
    )
}