import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';
import Pet from '../components/Pet';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome6 } from '@expo/vector-icons';
import { subscribeCheckInsByUserId, subscribeHabitsByUserId, subscribeDueHabitsByUserId, updateHabit, updateUserData } from '../firebase-files/firestoreHelper';
import { Alert } from 'react-native';
import * as Colors from '../components/Colors';
import IconButton from '../components/IconButton';


export default function Home({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton onPress={() => navigation.navigate('AddHabit')} >
                    <FontAwesome6 name="add" size={24} color={Colors.chestnut} style={Styles.iconButton} />
                </IconButton>
            ),
        });
    }, []);

    const [habits, setHabits] = useState(null);
    const [checkIns, setCheckIns] = useState(null);
    const [renderWelcome, setRenderWelcome] = useState(false);
    const [userProgress, setUserProgress] = useState(0);
    const [dueHabits, setDueHabits] = useState([]);

    // get habits and checkin data from firebase
    useEffect(() => {
        const userId = auth.currentUser.uid;

        const unsubscribeCheckIns = subscribeCheckInsByUserId(userId, (checkInsData) => {
            setCheckIns(checkInsData);
        });

        const unsubscribeHabits = subscribeHabitsByUserId(userId, (habitsData) => {
            setHabits(habitsData);
        });

        const unsubscribeDueHabits = subscribeDueHabitsByUserId(userId, (habitsData) => {
            setDueHabits(habitsData);
        });

        return () => {
            unsubscribeCheckIns();
            unsubscribeHabits();
            unsubscribeDueHabits();
        };
    }, []);

    // check if the user has any habits
    useEffect(() => {
        if (habits) {
            setRenderWelcome(habits.length === 0);
        }
    }, [habits]);

    // check if there is any failed habits today, only show once
    // TODO: test this feature tomorrow
    useEffect(() => {
        if (dueHabits && dueHabits.length > 0) {
            let alertMessage = `You failed ${dueHabits.length} habits today!\n\n`;
            dueHabits.forEach((habit) => {
                alertMessage += `Name: ${habit.habit}\nStart Date: ${new Date(habit.startDate.toMillis()).toDateString()}\nProgress: ${habit.progress}%\n\n`;
            });
            Alert.alert('Failed Habits', alertMessage, [{ text: 'OK' }]);
            async function updateFailedHabits() {
                dueHabits.forEach(async (habitObj) => {
                    await updateHabit(auth.currentUser.uid, habitObj.id, { ...habitObj, status: 'failed' });
                });
            }
            updateFailedHabits();
        }
    }, []);

    // update user progress when habits change
    useEffect(() => {
        // get the progress of all habits
        function updatePetProgress() {
            if (habits) {
                const totalHabits = habits.length;
                let totalProgress = 0;
                habits.forEach(habit => {
                    totalProgress += habit.progress;
                });
                const currentUserProgress = Math.round(totalProgress / totalHabits);
                setUserProgress(currentUserProgress);
            }
        }
        updatePetProgress();
    }, [habits]);

    // update user progress to firebase
    useEffect(() => {
        async function updateUserProgress() {
            await updateUserData(auth.currentUser.uid, { totalProgress: userProgress });
        }
        updateUserProgress();
    }, [userProgress]);

    return (
        <View style={Styles.container}>
            {renderWelcome ? <Welcome navigation={navigation} /> :
                <View >
                    <FlatList
                        data={habits}
                        renderItem={({ item }) => {
                            return <HabitItem
                                habitObj={item}
                                navigation={navigation}
                            />
                        }}
                    />
                    <Pet userProgress={userProgress} />
                    
                </View>
            }
        </View>
    );
}

