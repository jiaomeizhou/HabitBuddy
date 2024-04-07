import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { subscribeCheckInsByUserId, subscribeHabitsByUserId, subscribeCompletedHabitsByUserId, subscribeFailedHabitsByUserId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import { Styles } from './Styles';

export default function Stats() {
    const [checkIns, setCheckIns] = useState([]);
    const [habits, setHabits] = useState([]);
    const [completedHabits, setCompletedHabits] = useState([]);
    const [failedHabits, setFailedHabits] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser.uid;

        const unsubscribeCheckIns = subscribeCheckInsByUserId(userId, (checkInsData) => {
            setCheckIns(checkInsData);
        });

        const unsubscribeHabits = subscribeHabitsByUserId(userId, (habitsData) => {
            setHabits(habitsData);
        });

        const unsubscribeCompletedHabits = subscribeCompletedHabitsByUserId(userId, (completedHabitsData) => {
            setCompletedHabits(completedHabitsData);
        });

        const unsubscribeFailedHabits = subscribeFailedHabitsByUserId(userId, (failedHabitsData) => {
            setFailedHabits(failedHabitsData);
        });

        return () => {
            unsubscribeCheckIns();
            unsubscribeHabits();
            unsubscribeCompletedHabits();
            unsubscribeFailedHabits();
        };
    }, []);

    return (
        <View style={Styles.statsContainer}>
            <View style={Styles.statsContainer}>
                <View style={Styles.statsCardPink}>
                    <Text style={Styles.statsLable}>Current Habits</Text>
                    <Text style={Styles.statsText}>{habits.length}</Text>
                </View>
                <View style={Styles.statsCardGrey}>
                    <Text style={Styles.statsLable}>Check-ins</Text>
                    <Text style={Styles.statsText}>{checkIns.length}</Text>
                </View>
            </View>
            <View style={Styles.statsContainer}>
                <View style={Styles.statsCardGrey}>
                    <Text style={Styles.statsLable}>Completed Habits</Text>
                    <Text style={Styles.statsText}>{completedHabits.length}</Text>
                </View>
                <View style={Styles.statsCardPink}>
                    <Text style={Styles.statsLable}>Failed Habits</Text>
                    <Text style={Styles.statsText}>{failedHabits.length}</Text>
                </View>
            </View>
        </View>
    );
};

