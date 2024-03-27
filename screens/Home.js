import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';
import { FontAwesome6 } from '@expo/vector-icons';
import Pet from '../components/Pet';
import { auth } from '../firebase-files/firebaseSetup';
import { doc, collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from '../firebase-files/firebaseSetup';
import { getAllDocs } from '../firebase-files/firestoreHelper';

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
    const [habits, setHabits] = useState(null);
    const [renderWelcome, setRenderWelcome] = useState(true);

    const toggleCheck = (habitId) => {
        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit.id === habitId ? { ...habit, checked: !habit.checked } : habit
            )
        );
    };

    // get habits data from firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(database, `Users/${auth.currentUser.uid}/Habits`),
            ),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No habits found.");
                    setRenderWelcome(false);
                    return;
                }
                let habits = [];
                querySnapshot.forEach((doc) => {
                    habits.push({ id: doc.id, ...doc.data() });
                });
                console.log("Habits: ", habits);
                setHabits(habits);
            },
            (error) => {
                console.error("Error reading habits: ", error);
            }
        );
        return () => {
            unsubscribe();
        }
    }, []);
    console.log("rederWelcome: ", renderWelcome);

    return (
        <View style={Styles.habitList}>
            {!renderWelcome ? <Welcome /> :
                <View>
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
            }
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
