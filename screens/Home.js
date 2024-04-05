import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';
import Pet from '../components/Pet';
import { auth } from '../firebase-files/firebaseSetup';
import { FontAwesome6 } from '@expo/vector-icons';
import { subscribeCheckInsByUserId, subscribeHabitsByUserId } from '../firebase-files/firestoreHelper';


export default function Home({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('AddHabit')}>
                    <FontAwesome6 name="add" size={24} color="black" />
                </Pressable>
            ),

        });
    }, []);

    const [habits, setHabits] = useState(null);
    const [checkIns, setCheckIns] = useState(null);
    const [renderWelcome, setRenderWelcome] = useState(false);
    const [userProgress, setUserProgress] = useState(0);

    // get habits and checkin data from firebase
    useEffect(() => {
        const userId = auth.currentUser.uid;

        const unsubscribeCheckIns = subscribeCheckInsByUserId(userId, (checkInsData) => {
            setCheckIns(checkInsData);
        });

        const unsubscribeHabits = subscribeHabitsByUserId(userId, (habitsData) => {
            setHabits(habitsData);
        });

        return () => {
            unsubscribeCheckIns();
            unsubscribeHabits();
        };
    }, []);

    // check if the user has any habits
    useEffect(() => {
        if (habits) {
            setRenderWelcome(habits.length === 0);
        }
    }, [habits]);

    // update user progress when habits change
    useEffect(() => {
        // get the progress of all habits
        function updateDogProgress() {
            let userProgress = 0;
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
        updateDogProgress();
    }, [habits]);

    return (
        <View style={Styles.habitList}>
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
                    <Pet userProgress={userProgress}/>
                </View>
            }
        </View>
    );
}

