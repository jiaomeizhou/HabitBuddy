import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import Checkbox from 'expo-checkbox';
import ProgressBar from './ProgressBar';
import { addCheckIn, updateHabit, deleteCheckIn } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

export default function HabitItem({ habitObj, onPress, currentUserCheckIns }) {
    const [isChecked, setChecked] = useState(false);
    const [todayCheckIns, setTodayCheckIns] = useState([]);

    function handlePress() {
        onPress(habitObj)
    }

    async function checkInHandler() {
        setChecked(!isChecked);
    }

    useEffect(() => {
        const todayDate = new Date().getDate();
        let currentHabitCheckIns = [];
        let todayCheckInList = [];
        if (currentUserCheckIns) {
            currentHabitCheckIns
                = currentUserCheckIns.filter((checkIn) => checkIn.habitId === habitObj.id);
        }
        if (currentHabitCheckIns.length > 0) {
            currentHabitCheckIns.forEach((checkIn) => {
                if (checkIn.date.toDate().getDate() === todayDate) {
                    todayCheckInList.push(checkIn);
                }
            });
        }
        setTodayCheckIns(todayCheckInList);
    }, [currentUserCheckIns])


    useEffect(() => {
        // TODO: chechedInToday should be updated as date changed
        habitObj = { ...habitObj, checkedInToday: isChecked };
        updateHabit(auth.currentUser.uid, habitObj.id, habitObj);
        if (isChecked) {
            const checkInData = {
                userId: auth.currentUser.uid,
                habitId: habitObj.id,
                date: new Date(),
                text: null,
                imageUrl: null
            };
            addCheckIn(checkInData);
        }
        else {
            // delete check-in data from Firestore
            if (todayCheckIns.length > 0) {
                todayCheckIns.forEach((checkIn) => {
                    deleteCheckIn(checkIn.id);
                });
            }
        }
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

