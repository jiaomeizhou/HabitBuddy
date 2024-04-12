import { StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react'
import { Styles } from './Styles';

export default function CustomDateTimePicker({ testID, value, mode, is24Hour, display, onChange }) {
    return (
        <DateTimePicker
            testID={testID}
            value={value}
            mode={mode}
            is24Hour={is24Hour}
            display={display}
            onChange={onChange}
            style={Styles.dateTimePicker}
        />
    )
}

const styles = StyleSheet.create({})