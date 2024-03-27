import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import Checkbox from 'expo-checkbox';
import ProgressBar from './ProgressBar';
import { addCheckIn } from '../firebase-files/firestoreHelper';
import { updateHabit } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

export default function HabitItem({ habitObj, onPress, toggleCheck}) {
    const [isChecked, setChecked] = useState(false);

    // console.log('habitObj', habitObj);

    function handlePress() {
        onPress(habitObj)
    }

    async function checkInHandler() {
        setChecked(!isChecked);
    }

    // calculate the progress of the habit
    useEffect(() => {
        habitObj = {...habitObj, checkedInToday: isChecked};
        console.log('habitObj is checked? ', habitObj.checkedInToday);
        updateHabit(auth.currentUser.uid, habitObj.id, habitObj);
    }, [isChecked])


    return (
        <PressableItem onPress={handlePress}>
            <View style={Styles.habitItem}>
                <Text style={Styles.habitText}>{habitObj.habit}</Text>
                <ProgressBar progress={habitObj.progress} label={`${habitObj.progress}%          `} />
                <Checkbox
                    value={isChecked}
                    onValueChange={checkInHandler}
                />
            </View>
        </PressableItem>
    )
}

