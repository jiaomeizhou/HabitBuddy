import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const habitsByCategory = {
        health: ['Exercise', 'Eat Breakfast', 'Drink Water in the morning'],
        study: ['Read', 'Practice', 'Research'],
        life: ['Meditate', 'Journal', 'Gratitude'],
        sport: ['Run', 'Swim', 'Yoga'],
        work: ['Plan', 'Organize', 'Prioritize'],
    };

    const renderHabitButtons = () => {
        if (!selectedCategory) {
            return null;
        }

        const habits = habitsByCategory[selectedCategory];
        return habits.map((habit, index) => (
            <Button
                key={index}
                title={habit}
                onPress={() => alert(`${habit} button pressed`)}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button
                title="Create your own habit"
                onPress={() => alert('Create your own habit button pressed')}
            />
            <View style={styles.buttonsContainer}>
                {Object.keys(habitsByCategory).map((category, index) => (
                    <Button
                        key={index}
                        title={category}
                        onPress={() => setSelectedCategory(category)}
                    />
                ))}
            </View>
            <View style={styles.habitButtonsContainer}>{renderHabitButtons()}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 10,
    },
    habitButtonsContainer: {
        marginTop: 20,
        width: '80%',
    },
});
