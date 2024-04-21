import { View, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button } from 'react-native-paper';
import { subscribeHabitsByUserId, fetchPublicCheckIns, fetchMyDiaries } from '../firebase-files/firestoreHelper';
import { auth } from '../firebase-files/firebaseSetup';
import { Styles } from '../components/Styles';
import PressableItem from '../components/PressableItem'
import { IconButton } from 'react-native-paper';


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
                <IconButton onPress={() => setCheckHabitsForNavigation(true)} icon="plus" />
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
        <View style={Styles.diaryContainer}>
            <FlatList
                data={showAllDiaries ? diaries : myDiaries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PressableItem onPress={() => handlePressDiary(item)}>
                        <Card style={Styles.diaryItem}>
                            {item.imageUri && <Card.Cover source={{ uri: item.imageUri }} style={Styles.diaryImage} />}
                            <Card.Title title={item.diary} />
                            <Card.Content>
                                <Text style={Styles.dateText}>
                                    {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'No date'}
                                </Text>
                            </Card.Content>
                        </Card>
                    </PressableItem>
                )}
            />
            <View style={Styles.diaryButtonsContainer}>
                <Button
                    mode="contained"
                    onPress={() => setShowAllDiaries(true)}
                    style={showAllDiaries ? Styles.activeButton : Styles.inactiveButton}
                >
                    All Diaries
                </Button>
                <Button
                    mode="contained"
                    onPress={() => setShowAllDiaries(false)}
                    style={!showAllDiaries ? Styles.activeButton : Styles.inactiveButton}
                >
                    My Diaries
                </Button>
            </View>
        </View>
    );
}