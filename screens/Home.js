import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';

export default function Home() {
    // TODO: replace it when we can read data from firebase
    const [habits, setHabits] = useState([
        { id: 1, name: 'Habit 1', progress: 0, checked: false },
        { id: 2, name: 'Habit 2', progress: 0, checked: false },
        { id: 3, name: 'Habit 3', progress: 0, checked: false },
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
