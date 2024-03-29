import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import Checkbox from 'expo-checkbox';
import ProgressBar from './ProgressBar';
import { addCheckIn, updateHabit, deleteCheckIn, subscribeCheckInsByUserIdAndHabitId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import CustomCheckBox from './CustomCheckBox';

export default function HabitItem({ habitObj, onPress, checkIns }) {
    // TODO: when the progress of a habit is 100%, show a message to the user
    const [isChecked, setChecked] = useState(false);
    const [todayCheckIns, setTodayCheckIns] = useState([]);
    const [habitCheckIns, setHabitCheckIns] = useState([]);
    const [progress, setProgress] = useState(0);

    function calculateProgress() {
        setProgress(habitCheckIns.length/(habitObj.frequency*habitObj.durationWeeks) * 100);
    }

    // get check-in data of current habit item from firebase
    useEffect(() => {
        const userId = auth.currentUser.uid;

        const unsubscribeHabitCheckIns = subscribeCheckInsByUserIdAndHabitId(userId, habitObj.id, (habitCheckInsData) => {
            setHabitCheckIns(habitCheckInsData);
        });

        return () => {
            unsubscribeHabitCheckIns();
        };
    }, []);

    // check if the habit is checked in today
    useEffect(() => {
        const todayCheckInsData = habitCheckIns.filter(checkIn => {
            return checkIn.date.toDate().getDate() === new Date().getDate();
        });
        setChecked(todayCheckInsData.length > 0);
        calculateProgress();
    }, [habitCheckIns]);

    // handle check-in box change
    async function handleCheckInChange() {
        setChecked(!isChecked);

        if (!isChecked) {
            const checkInData = {
                userId: auth.currentUser.uid,
                habitId: habitObj.id,
                date: new Date(),
                text: null,
                imageUrl: null
            };
            await addCheckIn(checkInData);
        } else {
            const todayCheckInsData = habitCheckIns.filter(checkIn => {
                return checkIn.date.toDate().getDate() === new Date().getDate();
            });

            todayCheckInsData.forEach(checkIn => {
                deleteCheckIn(checkIn.id);
            });
        }
    }

    function handlePress() {
        onPress(habitObj)
    }

    return (
        <PressableItem onPress={handlePress}>
            <View style={Styles.habitItem}>
                <Text style={Styles.habitText}>{habitObj.habit}</Text>
                <ProgressBar progress={progress} label={`${progress}%          `} />
                <CustomCheckBox
                    value={isChecked}
                    onValueChange={handleCheckInChange}
                />
            </View>
        </PressableItem>
    )
}

