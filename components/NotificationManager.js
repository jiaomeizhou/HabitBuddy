import { StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Notifications from "expo-notifications";
import { Button, Card } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function NotificationManager() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisibility] = useState(false);

    async function verifyPermission() {
        try {
            const status = await Notifications.getPermissionsAsync();
            if (status.granted) {
                return true;
            }

            const permissionResponse = await Notifications.requestPermissionsAsync();
            return permissionResponse.granted;
        } catch (err) {
            console.log(err);
        }
    }
    async function scheduleNotification(date) {
        try {
            const havePermission = await verifyPermission();
            if (!havePermission) {
                Alert.alert("You need to give permission for notification");
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Time to check your habit!',
                    body: 'You have a habit to check today!',
                },
                trigger: {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    repeats: false,
                },
            });

            Alert.alert('Reminder Set', `You will be reminded at ${date.getHours()}:${date.getMinutes()}`);
        } catch (err) {
            console.log(err);
        }
        hideDatePicker();
    }

    const handleConfirm = (date) => {
        setSelectedDate(date);
        setDatePickerVisibility(false);
        scheduleNotification(date);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    return (
        <Card style={styles.card}>
            <Card.Content>
                <Button
                    icon="bell"
                    mode="contained"
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    onPress={showDatePicker}
                >
                    Set Dialy Reminder
                </Button>
                <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode="time"
                    date={selectedDate}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    headerTextIOS="Pick a reminder time"
                />
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#879E76',
    },
    button: {
        marginVertical: 8,
        backgroundColor: '#E2E9DC',
    },
    buttonLabel: {
        color: '#5A7247',
    },
})