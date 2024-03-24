import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Stats = () => {
    // Mock data for statistics
    const currentHabits = 15;
    const achievements = 5;
    const totalCheckin = 100;
    const pets = 2;


    return (
        <View >
            <Text>Total Habits: {currentHabits}</Text>
            <Text>Achievements: {achievements}</Text>
            <Text>Check-in: {totalCheckin}</Text>
            <Text>Pets: {pets}</Text>
        </View>
    );
};



export default Stats;
