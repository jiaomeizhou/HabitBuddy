import { Alert, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import AddHabitScreen from './AddHabitScreen';
import IconButton from '../components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { deleteHabit } from '../firebase-files/firestoreHelper';

export default function EditHabitScreen({ navigation, route }) {

    const habit = route.params ? route.params : null;
    const habitData = habit.habitObj;
    const habitId = habitData.id;
    const userId = habitData.userId;

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
                        deleteHabit(userId, habitId);
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