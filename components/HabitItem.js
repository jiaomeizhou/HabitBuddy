import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import Checkbox from 'expo-checkbox';
import ProgressBar from './ProgressBar';
import { addCheckIn, updateHabit, deleteCheckIn } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import CustomCheckBox from './CustomCheckBox';

export default function HabitItem({ habitObj, onPress, currentUserCheckIns }) {
    // TODO: when the progress of a habit is 100%, show a message to the user
    const [isChecked, setChecked] = useState(false);
    const [todayCheckIns, setTodayCheckIns] = useState([]);
    const [checkInCount, setCheckInCount] = useState(habitObj.checkInCount);

    useEffect(() => {
        if (isChecked) {
            setCheckInCount((prevCount) => prevCount + 1);
        } else {
            setCheckInCount((prevCount) => prevCount - 1);
        }
    }, [isChecked]);

    function handlePress() {
        onPress(habitObj)
    }

    function checkInHandler() {
        setChecked(!isChecked);
    }

    useEffect(() => {
        // Check if today's check-in data exists, if not, clear the check-in state
        if (todayCheckIns.length === 0) {
            setChecked(false);
        }
        else {
        }
    }, [])

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
        const handleCheckIn = async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));

            habitObj = { ...habitObj, checkedInToday: isChecked };
            await updateHabit(auth.currentUser.uid, habitObj.id, habitObj);
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
        };
        handleCheckIn();
    }, [isChecked])

    return (
        <PressableItem onPress={handlePress}>
            <View style={Styles.habitItem}>
                <Text style={Styles.habitText}>{habitObj.habit}</Text>
                <ProgressBar progress={habitObj.progress} label={`${habitObj.progress}%          `} />
                <CustomCheckBox
                    value={isChecked}
                    onValueChange={checkInHandler}
                />
            </View>
        </PressableItem>
    )
}

