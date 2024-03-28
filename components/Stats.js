import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCheckInsByUserId, getHabitsByUserId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

export default function Stats() {
    const [checkIns, setCheckIns] = useState(null);
    const [habits, setHabits] = useState(0);

    async function getStats() {
        // Get the current user's check-ins
        const userId = auth.currentUser.uid;
        const checkIns = await getCheckInsByUserId(userId);
        const habitNumber = await getHabitsByUserId(userId);
        setCheckIns(checkIns);
        setHabits(habitNumber);
    }

    useEffect(() => {
        getStats();
    }, [checkIns, habits]);

    // TODO: mark and check the completed habits and current habits
    return (
        <View >
            <Text>Total Habits: {habits ? habits.length : 0}</Text>
            <Text>Check-in: {checkIns ? checkIns.length : 0}</Text>
        </View>
    );
};

