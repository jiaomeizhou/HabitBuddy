import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { subscribeCheckInsByUserId, subscribeHabitsByUserId, subscribeCompletedHabitsByUserId, subscribeFailedHabitsByUserId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

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
        <View>
            <Text>Current Habits: {habits.length}</Text>
            <Text>Check-in: {checkIns.length}</Text>
            <Text>Completed Habits: {completedHabits.length}</Text>
            <Text>Failed Habits: {failedHabits.length}</Text>
        </View>
    );
};

