import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addHabit, updateHabit } from '../firebase-files/firestoreHelper';
import { convertTimestampToDate } from '../helpers/dateHelper';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import CustomSwitch from '../components/CustomSwitch';
import PressableButton from '../components/PressableButton';
import { auth } from '../firebase-files/firebaseSetup';

export default function AddHabitScreen({ route }) {
    // TODO: render shortcut name as the default habit name
    // which is the habit name passed from the Welcome screen
    const { habitShortcutName } = route.params || {};

    const navigation = useNavigation();
    const [habitName, setHabitName] = useState(habitShortcutName || '');
    console.log("name", habitName)
    const [habitFrequency, setHabitFrequency] = useState('');
    const [durationWeeks, setDurationWeeks] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [isReminderEnabled, setIsReminderEnabled] = useState(false);
    const userId = auth.currentUser.uid;

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
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const habitData = route.params?.habitData || null;
    const habitId = habitData?.id || null;
    const isEditMode = route.params?.isEditMode || false;

    useEffect(() => {
        if (habitData) {
            setHabitName(habitData.habit);
            setHabitFrequency(habitData.frequency);
            setDate(habitData.startDate.toDate());
            setFormattedDate(convertTimestampToDate(habitData.startDate));
            setDurationWeeks(habitData.durationWeeks.toString());
            setIsReminderEnabled(habitData.isReminderEnabled);
            setEndDate(habitData.endDate);
        } else {
            if (habitName) {
                setHabitName(habitName);
            } else {
                setHabitName('');
            }
            setHabitFrequency('');
            setDate(new Date());
            setFormattedDate('');
            setDurationWeeks('');
            setEndDate(null);
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
        setEndDate(result);
        setFormattedEndDate(result.toDateString());

    }

    function saveHandler() {
        if (!habitName || !habitFrequency || !date || !formattedDate || !durationWeeks || isNaN(durationWeeks) || !Number.isInteger(Number(durationWeeks)) || durationWeeks <= 0) {
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
            'progress': 0,
            'checkInCount': 0,
            'userId': userId,
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
                            updateHabit(userId, habitId, updatedHabit)
                                .then(() => {
                                    navigation.navigate('Home');
                                })
                        }
                    }
                ]
            );
        } else {
            addHabit(userId, newHabit)
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
            <CustomText>{'Type the habit name :'}</CustomText>
            <CustomTextInput
                onChangeText={handleHabitNameChange}
                value={habitName}
            />

            <CustomText>{'Habit Frequency (How often in 1 week) :'}</CustomText>
            <CustomDropDownPicker
                open={open}
                value={habitFrequency}
                listMode="SCROLLVIEW"
                items={items}
                setOpen={setOpen}
                setValue={setHabitFrequency}
                setItems={setItems}
                placeholder="Select the frequency"
            />

            <CustomText>{'Start Date :'}</CustomText>
            <CustomTextInput
                value={formattedDate}
                onPressIn={toggleDatePicker}
                showSoftInputOnFocus={false}
                onChange={dateHandler}
            />
            {isDatePickerVisible && (
                <CustomDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display='inline'
                    onChange={dateHandler}
                />
            )}

            <CustomText>{'Spend how many weeks :'}</CustomText>
            <CustomTextInput
                value={durationWeeks}
                onChangeText={handleDurationChange}
                keyboardType="numeric"
            />

            <CustomText>{'End Date :'}</CustomText>
            <CustomText style={styles.input}>{formattedEndDate}</CustomText>

            <CustomSwitch
                label="Reminder : "
                onValueChange={setIsReminderEnabled}
                value={isReminderEnabled}
            />

            <View style={styles.buttonsContainer}>
                <PressableButton title="Save" onPress={saveHandler} color='#2196F3' />
                <PressableButton title="Cancel" onPress={cancelHandler} color='#B0ADAD' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 2,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'normal',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})