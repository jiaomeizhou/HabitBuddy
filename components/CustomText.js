import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomText({ style, children, ...rest }) {
    return (
        <View>
            <Text style={[styles.titleText, style]} {...rest}>
                {children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
    },
})