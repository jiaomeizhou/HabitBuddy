import { StyleSheet, Switch, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

export default function CustomSwitch({ value, onValueChange, label }) {
    return (
        <View style={styles.container}>
            <CustomText>{label}</CustomText>
            <Switch
                onValueChange={onValueChange}
                value={value}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
})