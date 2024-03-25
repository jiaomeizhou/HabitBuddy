import { Button, StyleSheet, Text, TextInput, Switch, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addHabit, updateHabit } from '../firebase-files/firestoreHelper';
import { convertTimestampToDate } from '../helpers/dateHelper';
import { useNavigation } from '@react-navigation/native';

export default function AddHabitScreen({ route }) {
    const navigation = useNavigation();
    const [habitName, setHabitName] = useState('');
    const [habitFrequency, setHabitFrequency] = useState('');
    const [durationWeeks, setDurationWeeks] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isReminderEnabled, setIsReminderEnabled] = useState(false);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
    ]);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const habitData = route.params?.habitData || null;
    const isEditMode = route.params?.isEditMode || false;

    useEffect(() => {
        if (habitData) {
            console.log('habitData: ', habitData);
            setHabitName(habitData.habit);
            setHabitFrequency(habitData.frequency);
            setDate(habitData.startDate);
            setFormattedDate(habitData.startDate.toDateString());
            setDurationWeeks(habitData.durationWeeks.toString());
            setIsReminderEnabled(habitData.isReminderEnabled);
            setEndDate(habitData.endDate);
        } else {
            setHabitName('');
            setHabitFrequency('');
            setDate(new Date());
            setFormattedDate('');
            setDurationWeeks('');
            setEndDate('');
            setIsReminderEnabled(false);
        }
    }, [habitData, isEditMode]);


    function handleHabitNameChange(text) {
        setHabitName(text);
    }

    function dateHandler(event, selectedDate) {
        const currentDate = selectedDate || date;
        setDatePickerVisibility(false);
        setDate(currentDate);
        setFormattedDate(currentDate.toDateString());
    }

    function toggleDatePicker() {
        setDatePickerVisibility(!isDatePickerVisible);
        if (!formattedDate) {
            const today = new Date();
            setDate(today);
            setFormattedDate(today.toDateString());
        }
    }

    function handleDurationChange(value) {
        setDurationWeeks(value);
        calculateEndDate(value);
    }

    function calculateEndDate(weeks) {
        const result = new Date(date);
        result.setDate(result.getDate() + weeks * 7);
        setEndDate(result.toDateString());
    }

    function saveHandler() {
        if (!habitName || !habitFrequency || !date || !formattedDate || !durationWeeks || isNaN(durationWeeks) || !Number.isInteger(Number(durationWeeks)) || durationWeeks < 0) {
            Alert.alert('Invalid Input', 'Please check the input fields and try again');
            return;
        }

        const newHabit = {
            'habit': habitName,
            'frequency': habitFrequency,
            'startDate': date,
            'endDate': endDate,
            'durationWeeks': parseInt(durationWeeks),
            'isReminderEnabled': isReminderEnabled,
        };

        if (habitData && isEditMode) {
            Alert.alert(
                "Important",
                "Are you sure you want to update this habit?",
                [
                    { text: "No", style: "cancel" },
                    {
                        text: "Yes", onPress: () => {
                            const updatedHabit = { ...habitData, ...newHabit };
                            // updateHabit(userId, habitData.id, updatedHabit);
                            updateHabit(1, "f02d6b4gt71NVD9kKYuG", updatedHabit)
                                .then(() => {
                                    navigation.goBack();
                                })
                        }
                    }
                ]
            );
        } else {
            // TODO: get the user id from the firebase authentication
            addHabit(1, newHabit)
                .then(() => {
                    navigation.goBack();
                })
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleText}>
                {'Type the habit name :'}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={handleHabitNameChange}
                value={habitName}
            />

            <Text style={styles.titleText}>
                {'Habit Frequency (How often in 1 week) :'}
            </Text>

            <DropDownPicker
                style={styles.dropDownPickerStyle}
                open={open}
                value={habitFrequency}
                listMode="SCROLLVIEW"
                items={items}
                setOpen={setOpen}
                setValue={setHabitFrequency}
                setItems={setItems}
                placeholder="Select the frequency"
            />

            <Text style={styles.titleText}>
                {'Start Date :'}
            </Text>
            <TextInput
                style={styles.input}
                value={formattedDate}
                onPressIn={toggleDatePicker}
                showSoftInputOnFocus={false}
                onChange={dateHandler}
            />
            {isDatePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display='inline'
                    onChange={dateHandler}
                />
            )}

            <Text style={styles.titleText}>
                {'Spend how many weeks :'}
            </Text>
            <TextInput
                style={styles.input}
                value={durationWeeks}
                onChangeText={handleDurationChange}
                keyboardType="numeric"
            />
            <Text style={styles.titleText}>
                {'End Date :'}
            </Text>

            <Text style={styles.input}>
                {endDate}
            </Text>

            <View style={styles.reminderContainer}>
                <Text style={styles.titleText}>
                    {'Reminder : '}
                </Text>
                <Switch
                    onValueChange={setIsReminderEnabled}
                    value={isReminderEnabled}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <Button title="Save" onPress={saveHandler} />
                <Button title="Cancel" onPress={cancelHandler} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 2,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'black',
    },
    dropDownPickerStyle: {
        marginVertical: 2,
        backgroundColor: 'gainsboro',
        marginBottom: 12
    },
    reminderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})