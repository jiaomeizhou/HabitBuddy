import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from './Styles';

// The ProgressBar component displays a progress bar with a label.
// It used in the HabitItem component to show the progress of a habit.
export default ProgressBar = ({ progress, label }) => {
    return (
        <View style={Styles.progressBarContainer}>
            <View style={Styles.progressBar}>
                <View style={[Styles.progress, { width: `${progress}%` }]} />
            </View>
            <Text style={Styles.progressLabel}>{label}</Text>
        </View>
    );
};


