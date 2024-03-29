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
import { subscribeCheckInsByUserId, subscribeHabitsByUserId } from '../firebase-files/firestoreHelper';


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

    // get habits and checkin data from firebase
    useEffect(() => {
        const userId = auth.currentUser.uid;

        const unsubscribeCheckIns = subscribeCheckInsByUserId(userId, (checkInsData) => {
            setCheckIns(checkInsData);
        });

        const unsubscribeHabits = subscribeHabitsByUserId(userId, (habitsData) => {
            setHabits(habitsData);
        });

        return () => {
            unsubscribeCheckIns();
            unsubscribeHabits();
        };
    }, []);

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
                                checkIns={checkIns}
                            />
                        }}
                    />
                    <Pet />
                </View>
            }
        </View>
    );
}

