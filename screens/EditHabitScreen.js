import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AddHabitScreen from './AddHabitScreen';
import IconButton from '../components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { deleteHabit } from '../firebase-files/firestoreHelper';

export default function EditHabitScreen({ navigation, route }) {
    console.log("EditHabitScreen route: ", route);

    // TODO: get habitData from route.params
    const habitData = {
        endDate: "Sun Apr 28 2024",
        frequency: 5,
        habit: "sleep",
        isReminderEnabled: true,
        startDate: new Date(),
        durationWeeks: 5
    };

    // const habit = route.params ? route.params.habit : null;
    // const { id } = habit;
    // const habitData = route.params.habit;

    useEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitle: "Edit a Habit",
            headerRight: () => (
                <IconButton onPress={deleteActivityHandler}>
                    <AntDesign name="delete" size={24} color="black" />
                </IconButton>
            ),
        });
    }, [navigation, deleteActivityHandler]);

    function deleteActivityHandler() {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this habit?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        // deleteHabit(userId, habitId);
                        deleteHabit(1, "oNIGxoLGP04gWVCFUoNm")
                        navigation.goBack();
                    },
                },
            ]
        );
    }

    return (
        <AddHabitScreen habitData={habitData} route={{ ...route, params: { ...route.params, habitData: habitData, isEditMode: true } }} />
    )
}

const styles = StyleSheet.create({})