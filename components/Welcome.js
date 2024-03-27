import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Welcome({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const habitsByCategory = {
        health: ['Exercise', 'Eat Breakfast', 'Drink Water in the morning'],
        study: ['Read', 'Practice', 'Research'],
        life: ['Meditate', 'Journal', 'Gratitude'],
        sport: ['Run', 'Swim', 'Yoga'],
        work: ['Plan', 'Organize', 'Prioritize'],
    };

    const renderHabitButtons = () => {
        let habits = [];
        if (selectedCategory) {
            habits = habitsByCategory[selectedCategory];
        }
        else {
            habits = habitsByCategory.health;
        }

        return habits.map((habit, index) => (
            <Button
                key={index}
                title={habit}
                onPress={() => navigation.navigate('AddHabit', { habitShortcutName: habit})}
            />
        ));
    };

    return (
        <View style={styles.container}>
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
                        color={selectedCategory === category ? 'blue' : 'grey'}
                    />
                ))}
            </View>
            <View style={styles.habitButtonsContainer}>{renderHabitButtons()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        marginTop: 10,
    },
    habitButtonsContainer: {
        marginTop: 20,
        width: '80%',
    },
    habitButtonSelected: {
        backgroundColor: 'blue',
    },
});