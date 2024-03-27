import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';
import { Styles } from '../components/Styles';
import Pet from '../components/Pet';
import { auth } from '../firebase-files/firebaseSetup';
import { doc, collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from '../firebase-files/firebaseSetup';
import { FontAwesome6 } from '@expo/vector-icons';


export default function Home({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('AddHabit')}>
                    <FontAwesome6 name="add" size={24} color="black" />
                </Pressable>
            ),

        });
    }, []);

    // TODO: replace it when we can read data from firebase
    const [habits, setHabits] = useState(null);
    const [checkIns, setCheckIns] = useState(null);
    const [renderWelcome, setRenderWelcome] = useState(false);

    // get habits data from firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(database, `Users/${auth.currentUser.uid}/Habits`),
            ),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No habits found.");
                    setRenderWelcome(true);
                    return;
                }
                let habits = [];
                querySnapshot.forEach((doc) => {
                    habits.push({ id: doc.id, ...doc.data() });
                });
                console.log("Habits: ", habits);
                setHabits(habits);
                setRenderWelcome(false);
            },
            (error) => {
                console.error("Error reading habits: ", error);
            }
        );

        // Get check-ins data from Firebase
        const unsubscribeCheckIns = onSnapshot(
            collection(database, 'CheckIns'),
            (querySnapshot) => {
                let checkInsData = [];
                querySnapshot.forEach((doc) => {
                    checkInsData.push({ id: doc.id, ...doc.data() });
                });
                setCheckIns(checkInsData);
            },
            (error) => {
                console.error('Error reading check-ins: ', error);
            }
        );

        return () => {
            unsubscribe();
            unsubscribeCheckIns();
        }
    }, []);
    console.log(checkIns);

    function habitItemPressed(habitObj) {
        navigation.navigate('HabitDetail', { habitObj });
    }

    return (
        <View style={Styles.habitList}>
            {renderWelcome ? <Welcome navigation={navigation} /> :
                <View >
                    <FlatList
                        data={habits}
                        renderItem={({ item }) => {
                            return <HabitItem
                                habitObj={item}
                                onPress={habitItemPressed}
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

