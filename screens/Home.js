import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';

export default function Home() {
    habitObj = {
        name: 'Habit 1',
        progress: 0,
        checked: false,
    }
    return (
        // <Welcome />
        <HabitItem habitObj={habitObj} onPress={() => alert('Habit item pressed')} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
