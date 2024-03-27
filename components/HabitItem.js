import { Text, View } from 'react-native'
import React from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import Checkbox from 'expo-checkbox';
import ProgressBar from './ProgressBar';

export default function HabitItem({ habitObj, onPress, toggleCheck}) {
    function handlePress() {
        onPress(habitObj)
    }

    return (
        <PressableItem onPress={handlePress}>
            <View style={Styles.habitItem}>
                <Text style={Styles.habitText}>{habitObj.habit}</Text>
                <ProgressBar progress={habitObj.progress} label={`${habitObj.progress}%          `} />
                <Checkbox
                    value={habitObj.checked}
                    onValueChange={toggleCheck}
                />
            </View>
        </PressableItem>
    )
}

