import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Colors from './Colors';
import { Styles } from './Styles';
import PressableButton from './PressableButton';

export default function Welcome({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState("health");

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
            <PressableButton
                key={index}
                title={habit}
                onPress={() => navigation.navigate('AddHabit', { habitShortcutName: habit })}
                color={Colors.white}
                customStyle={Styles.pressableButton}
                textColor={Colors.feldGrau}
            />
        ));
    };

    return (
        <View style={Styles.welcomeContainer}>
            <Text style={Styles.nameText}>Welcome to Habit Buddy!</Text>
            <Text style={Styles.statusText}>Click on a habit to get started</Text>
            <View style={Styles.shortcutContainer}>
                <View style={Styles.buttonsContainer}>
                    {Object.keys(habitsByCategory).map((category, index) => (
                        <PressableButton
                            key={index}
                            title={category}
                            onPress={() => setSelectedCategory(category)}
                            color={selectedCategory === category ? Colors.fernGreen : 'grey'}
                            customStyle={Styles.categoryButton}
                            textColor={Colors.white}
                        />
                    ))}
                </View>
                <View style={Styles.habitButtonsContainer}>{renderHabitButtons()}</View>
            </View>
            <PressableButton
                title="Create your own habit"
                onPress={() => navigation.navigate('AddHabit')}
                color={Colors.fernGreen}
                customStyle={Styles.pressableButton}
                textColor={Colors.white}
            />
        </View>
    )
}
