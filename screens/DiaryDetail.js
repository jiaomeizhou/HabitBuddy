import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomText from '../components/CustomText';

export default function DiaryDetail({ route }) {
    const { diary } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {diary.imageUri && <Image source={{ uri: diary.imageUri }} style={styles.image} />}
            <CustomText style={styles.diaryText}>{diary.taskCompleted ? 'Check In completed' : 'Check In not completed'}</CustomText>
            <CustomText style={styles.diaryText}>{diary.diary}</CustomText>
            <CustomText style={styles.dateText}>{new Date(diary.createdAt.seconds * 1000).toLocaleDateString()}</CustomText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 5,
    },
    diaryText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'normal',
    },
    dateText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
})