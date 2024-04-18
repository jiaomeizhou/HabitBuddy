import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableItem from './PressableItem'
import { Styles } from './Styles'
import ProgressBar from './ProgressBar';
import { addCheckIn, updateHabit, deleteCheckIn, subscribeCheckInsByUserIdAndHabitId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import CustomCheckBox from './CustomCheckBox';

export default function HabitItem({ habitObj, navigation }) {
    const [isChecked, setChecked] = useState(false);
    const [habitCheckIns, setHabitCheckIns] = useState([]);
    const [progress, setProgress] = useState(0);
    const [todayCheckInsData, setTodayCheckInsData] = useState([]);

    function calculateProgress() {
        setProgress(Math.round(habitCheckIns.length / (habitObj.frequency * habitObj.durationWeeks) * 100));
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
        try {
            const todayCheckInsData = habitCheckIns.filter(checkIn => {
                return checkIn.date.toDate().getDate() === new Date().getDate();
            });
            setChecked(todayCheckInsData.length > 0);
            setTodayCheckInsData(todayCheckInsData);
            calculateProgress();
        } catch (error) {
            console.error("Error getting today's check-ins: ", error);
        }
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
                imageUri: null,
                taskCompleted: true,
            };
            await addCheckIn(checkInData);
        } else {
            todayCheckInsData.forEach(checkIn => {
                deleteCheckIn(checkIn.id);
            });
        }
    }

    function handlePress() {
        navigation.navigate('HabitDetail', { habitObj, progress, habitCheckIns, todayCheckInsData });
    }

    useEffect(() => {
        if (progress === 100) {
            Alert.alert("Congratulations!", `You have completed this habit ${habitObj.habit}!`);
        }
        async function updateHabitProgress() {
            if (progress === 100) {
                await updateHabit(auth.currentUser.uid, habitObj.id, { ...habitObj, progress: progress, checkInCount: habitCheckIns.length, status: 'completed' });
            } else {
                await updateHabit(auth.currentUser.uid, habitObj.id, { ...habitObj, progress: progress, checkInCount: habitCheckIns.length });
            }
        }
        // Update habit's progress after check-in change
        updateHabitProgress();
        // console.log("update habit progress", habitObj, progress)
    }, [progress]);

    return (
        <PressableItem onPress={handlePress} >
            <View style={Styles.habitItem}>
                <View style={{flex: 5}}>
                    <Text style={Styles.habitText}>
                        {habitObj.habit}
                    </Text>
                </View>
                <View style={{flex: 4}}>
                    <ProgressBar progress={progress} label={`${progress}%`} />
                </View>
                <View style={{flex: 1}}>
                    <CustomCheckBox
                        value={isChecked}
                        onValueChange={handleCheckInChange}
                        progress={progress}
                        habitCheckIns={habitCheckIns}
                        todayCheckInsData={todayCheckInsData}
                    />
                </View>
            </View>
        </PressableItem>
    )
}

