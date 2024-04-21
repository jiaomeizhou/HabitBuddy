import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // Import Calendar component
import { Styles } from '../components/Styles';
import moment from 'moment';
import * as Colors from '../components/Colors';
import PressableButton from '../components/PressableButton';
import { IconButton } from 'react-native-paper';

// Set up the locale configuration for the calendar
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

// HabitDetail screen displays the details of a habit.
export default function HabitDetail({ route, navigation }) {
  const { habitObj, progress, habitCheckIns, todayCheckInsData } = route.params;
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkedDates, setCheckedDates] = useState([]);

  // Set the header options for the screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={() => navigation.navigate('EditHabit', { habitObj: habitObj })} icon="pencil" />
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
    <View style={Styles.habitDetailContainer}>
      <Text style={Styles.habitDetailText}>{habitObj.habit}</Text>
      <Calendar
        markedDates={checkedDates.reduce((acc, date) => {
          acc[date] = { selected: true, marked: true, selectedColor: 'green' };
          return acc;
        }, {})}
        renderDay={renderDate}
        style={Styles.calendar}
      />
      <Text style={Styles.habitDetailText}>Progress: {progress}%</Text>
      <Text style={Styles.statusText}>You have checked in {habitCheckIns.length} times!</Text>
      <PressableButton
        title="Check in with a diary entry"
        onPress={handleCheckinButton}
        disabled={checkedInToday}
        color={Colors.fernGreen}
        customStyle={Styles.pressableButton}
        textColor={Colors.white}
      />
    </View>
  );
}
