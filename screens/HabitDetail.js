import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // Import Calendar component

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
    // Simulated checked-in dates for demonstration
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

  return (
    <View>
      <Text>{habitObj.habit}</Text>
      <Calendar
        markedDates={checkedDates.reduce((acc, date) => {
          acc[date] = { selected: true, marked: true, selectedColor: 'green' };
          return acc;
        }, {})}
        renderDay={renderDate}
      />
      <Button title="Check in" onPress={handleCheckinButton} disabled={habitObj.checkedInToday} />

    </View>
  );
}
