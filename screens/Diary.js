import { View, FlatList, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button } from 'react-native-paper';
import IconButton from '../components/IconButton';
import { FontAwesome6 } from '@expo/vector-icons';
import { subscribeHabitsByUserId, fetchPublicCheckIns, fetchMyDiaries } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';

export default function Diary() {
    const [diaries, setDiaries] = useState([]);
    const [myDiaries, setMyDiaries] = useState([]);
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [checkHabitsForNavigation, setCheckHabitsForNavigation] = useState(false);
    const [showAllDiaries, setShowAllDiaries] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerRight: () => (
                <IconButton onPress={() => setCheckHabitsForNavigation(true)}>
                    <FontAwesome6 name="add" size={24} color="black" />
                </IconButton>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = fetchPublicCheckIns(setDiaries);
        const unsubscribeMyDiaries = fetchMyDiaries(userId, setMyDiaries);
        return () => {
            unsubscribe()
            unsubscribeMyDiaries();
        };
    }, []);

    useEffect(() => {
        if (checkHabitsForNavigation) {
            const unsubscribe = subscribeHabitsByUserId(userId, (habits) => {
                if (habits.length > 0) {
                    const formattedHabits = habits.map(habit => ({
                        id: habit.id,
                        label: habit.habit,
                    }));
                    navigation.navigate('PostDiary', { fromDiary: true, formattedHabits: formattedHabits });
                } else {
                    Alert.alert("No Habits", "You do not have any habits. Please add some habits first.");
                    navigation.navigate('Home');
                }
                setCheckHabitsForNavigation(false);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [checkHabitsForNavigation, userId, navigation]);

    const handlePressDiary = (diary) => {
        navigation.navigate('DiaryDetail', { diary });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={showAllDiaries ? diaries : myDiaries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => handlePressDiary(item)} style={styles.diaryItem}>
                        {item.imageUri && <Card.Cover source={{ uri: item.imageUri }} style={styles.image} />}
                        <Card.Title title={item.diary} />
                        <Card.Content>
                            <Text style={styles.dateText}>
                                {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'No date'}
                            </Text>
                        </Card.Content>
                    </Card>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => setShowAllDiaries(true)}
                    style={showAllDiaries ? styles.activeButton : styles.inactiveButton}
                >
                    All Diaries
                </Button>
                <Button
                    mode="contained"
                    onPress={() => setShowAllDiaries(false)}
                    style={!showAllDiaries ? styles.activeButton : styles.inactiveButton}
                >
                    My Diaries
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    diaryItem: {
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: 'rgba(247 248 245 / 0.9)'
    },
    image: {
        height: 200,
        borderRadius: 5,
    },
    diaryText: {
        fontWeight: 'normal',
        fontSize: 13,
        marginVertical: 5,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#3498db',
    },
    inactiveButton: {
        backgroundColor: '#ccc',
    },
})