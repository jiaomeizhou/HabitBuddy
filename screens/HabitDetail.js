import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // Import Calendar component
import { Styles } from '../components/Styles';
import moment from 'moment';

// Set up the locale configuration for the calendar
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

export default function HabitDetail({ route, navigation }) {
  const { habitObj, progress, habitCheckIns, todayCheckInsData } = route.params;
  const [checkedInToday, setCheckedInToday] = useState(false);
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

  // Convert date to local time zone string
  const convertToLocalDateString = (date) => {
    return moment(date).format('YYYY-MM-DD'); // Use moment to format date in local time zone
  };

  // disable the check-in button if the user has already checked in today
  // get checkedDates from habitCheckIns
  useEffect(() => {
    if (habitCheckIns) {
      setCheckedInToday(todayCheckInsData.length > 0);
      const checkedDates = habitCheckIns.map((checkIn) => {
        return convertToLocalDateString(checkIn.date.toDate());
      });
      setCheckedDates(checkedDates);
    }
  }, []);

  // Function to handle navigation to Checkin screen
  function handleCheckinButton() {
    navigation.navigate('PostDiary', { habitObj: habitObj });
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
    <View style={Styles.container}>
      <Text style={Styles.habitText}>{habitObj.habit}</Text>
      <Calendar
        markedDates={checkedDates.reduce((acc, date) => {
          acc[date] = { selected: true, marked: true, selectedColor: 'green' };
          return acc;
        }, {})}
        renderDay={renderDate}
      />
      <Text style={Styles.progressText}>Progress: {progress}%</Text>
      <Text style={Styles.checkInText}>You have checked in {habitCheckIns.length} times!</Text>
      <Button
        title="Check in"
        onPress={handleCheckinButton}
        disabled={checkedInToday}
        style={Styles.button}
      />
    </View>
  );
}
