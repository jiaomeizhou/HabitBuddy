import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableItem from './PressableItem'

export default function HabitItem({ habitObj, onPress }) {
    function handlePress() {
        onPress(habitObj)
    }

    return (
        <PressableItem onPress={handlePress}>
            <View style={styles.habitItem}>
                <Text style={styles.habitText}>{habitObj.name}</Text>
                <Text style={styles.habitText}>{habitObj.progress}</Text>
                <Text style={styles.habitText}>{habitObj.checked}</Text>
            </View>
        </PressableItem>
    )
}

const styles = StyleSheet.create({
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    habitText: {
        fontSize: 18,
    }
})