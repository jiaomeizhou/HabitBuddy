import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from './Styles';


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


