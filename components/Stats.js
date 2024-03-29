import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { subscribeCheckInsByUserId, subscribeHabitsByUserId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

export default function Stats() {
    const [checkIns, setCheckIns] = useState([]);
    const [habits, setHabits] = useState([]);

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

    return (
        <View>
            <Text>Total Habits: {habits.length}</Text>
            <Text>Check-in: {checkIns.length}</Text>
        </View>
    );
};

