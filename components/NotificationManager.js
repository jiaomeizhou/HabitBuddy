import { Alert } from 'react-native'
import React, { useState } from 'react'
import * as Notifications from "expo-notifications";
import { Button, Card } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Styles } from '../components/Styles';

// Component for managing daily reminders via notifications.
export default function NotificationManager() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisibility] = useState(false);

    // Function to verify or request notification permissions.
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

    // Function to schedule a notification at a specified date and time.
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

    // Handler for confirming date selection. Sets the date and schedules the notification.
    const handleConfirm = (date) => {
        setSelectedDate(date);
        setDatePickerVisibility(false);
        scheduleNotification(date);
    };

    // Shows the date picker modal.
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    // Hides the date picker modal.
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    return (
        <Card style={Styles.notificationCard}>
            <Card.Content>
                <Button
                    icon="bell"
                    mode="contained"
                    style={Styles.notificationButton}
                    labelStyle={Styles.notificaitonButtonLabel}
                    onPress={showDatePicker}
                >
                    Set Daily Reminder
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
