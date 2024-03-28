import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCheckInsByUserId } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

const Stats = () => {
    // Mock data for statistics
    const currentHabits = 15;
    const achievements = 5;
    const totalCheckin = 100;
    const pets = 2;
    const [checkIns, setCheckIns] = useState(null);

    async function getStats() {
        // Get the current user's check-ins
        const userId = auth.currentUser.uid;
        const checkIns = await getCheckInsByUserId(userId);
        setCheckIns(checkIns);
    }

    useEffect(() => {
        getStats();
    }, []);

    console.log("checkIns", checkIns);
    return (
        <View >
            <Text>Total Habits: {currentHabits}</Text>
            <Text>Achievements: {achievements}</Text>
            <Text>Check-in: {totalCheckin}</Text>
            <Text>Pets: {pets}</Text>
            {checkIns && <Text>{checkIns[0].habitId}</Text>}
        </View>
    );
};



export default Stats;
