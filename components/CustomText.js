import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomText({ style, children }) {
    return (
        <View>
            <Text style={[styles.titleText, style]}>{children}</Text>
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