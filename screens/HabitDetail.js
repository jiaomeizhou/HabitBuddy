import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // Import Calendar component
import { updateHabit } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import { Styles } from '../components/Styles';

// Set up the locale configuration for the calendar
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

export default function HabitDetail({ route, navigation }) {
  const { habitObj } = route.params;
  const { currentUserCheckIns } = route.params;
  const [checkedDates, setCheckedDates] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('EditHabit', { habitObj: habitObj })}>
          <FontAwesome6 name="edit" size={24} color="black" />
        </Pressable>
      ),
    });
  })

  useEffect(() => {
    const checkedInDates = [];
    const currentHabitCheckIns = currentUserCheckIns.filter((checkIn) => checkIn.habitId === habitObj.id);
    currentHabitCheckIns.forEach((checkIn) => {
      checkedInDates.push(checkIn.date.toDate().toISOString().slice(0, 10));
    });
    setCheckedDates(checkedInDates);
  }, [currentUserCheckIns]);
  console.log('checkedDates', checkedDates);

  // Function to handle navigation to Checkin screen
  function handleCheckinButton() {
    navigation.navigate('Checkin', { habitObj: habitObj });
  }

  // Render function for customizing date cells in the calendar
  const renderDate = (date) => {
    const formattedDate = date.dateString;
    const isDateChecked = checkedDates.includes(formattedDate);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: isDateChecked ? 'green' : 'black' }}>{formattedDate}</Text>
      </View>
    );
  };

  useEffect(() => {
    const calculateProgress = async () => {
      try {
        // Wait for checkedDates to update
        // await new Promise((resolve) => setTimeout(resolve, 0));
        const checkInCount = checkedDates.length;
        const newProgress = Math.round((checkInCount / (habitObj.frequency * habitObj.durationWeeks)) * 100);
        console.log("Progress: ", newProgress, checkInCount, habitObj.frequency * habitObj.durationWeeks);
        const updatedHabit = { ...habitObj, progress: newProgress, checkInCount: checkInCount };
        await updateHabit(auth.currentUser.uid, habitObj.id, updatedHabit);
      } catch (error) {
        console.log("Error calculating progress: ", error);
      }
    };
    calculateProgress();

  }, [checkedDates, habitObj]);

  console.log('habitObj', habitObj);


  return (
    <View style={Styles.container}>
      <Text style={Styles.habitText}>{habitObj.habit}</Text>
      <Calendar
        markedDates={checkedDates.reduce((acc, date) => {
          acc[date] = { selected: true, marked: true, selectedColor: 'green' };
          return acc;
        }, {})}
        renderDay={renderDate}
      />
      <Text style={Styles.progressText}>Progress: {habitObj.progress}%</Text>
      <Text style={Styles.checkInText}>You have checked in {habitObj.checkInCount} times!</Text>
      <Button
        title="Check in"
        onPress={handleCheckinButton}
        disabled={habitObj.checkedInToday}
        style={Styles.button}
      />
    </View>
  );
}
