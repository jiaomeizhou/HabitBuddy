import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';
import { FontAwesome6 } from '@expo/vector-icons';
import Pet from '../components/Pet';

export default function Home({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('AddHabit')}>
                    <FontAwesome6 name="add" size={24} color="black" />
                </Pressable>
            ),
            // TODO: just test the edit function, need to be removed
            headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('EditHabit')}>
                    <FontAwesome6 name="edit" size={24} color="black" />
                </Pressable>
            )
        });
    }, []);

    // TODO: replace it when we can read data from firebase
    const [habits, setHabits] = useState([
        { id: 1, name: 'Habit 1', progress: 0, checked: false },
        { id: 2, name: 'Habit 2', progress: 10, checked: false },
        { id: 3, name: 'Habit 3', progress: 80, checked: false },
    ]);

    const toggleCheck = (habitId) => {
        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit.id === habitId ? { ...habit, checked: !habit.checked } : habit
            )
        );
    };

    return (
        <View style={Styles.habitList}>
            <FlatList
                data={habits}
                renderItem={({ item }) => {
                    return <HabitItem
                        habitObj={item}
                        onPress={() => alert(`Habit ${item.id} pressed`)}
                        toggleCheck={() => toggleCheck(item.id)}
                    />
                }}
            />
            <Pet />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
