import { View, FlatList, Text, Image, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase-files/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import PressableItem from '../components/PressableItem'
import CustomText from '../components/CustomText';

export default function Diary() {
    const [diaries, setDiaries] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPublicDiaries = async () => {
            const q = query(collection(database, "CheckIns"), where("isPublic", "==", true));
            const querySnapshot = await getDocs(q);
            const fetchedDiaries = [];
            querySnapshot.forEach((doc) => {
                fetchedDiaries.push({ id: doc.id, ...doc.data() });
            });
            setDiaries(fetchedDiaries);
        };

        fetchPublicDiaries();
    }, []);

    const handlePressDiary = (diary) => {
        navigation.navigate('DiaryDetail', { diary });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={diaries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PressableItem onPress={() => handlePressDiary(item)} style={styles.diaryItem}>
                        {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
                        <CustomText style={styles.diaryText} numberOfLines={2} >{item.diary}</CustomText>
                        <CustomText style={styles.dateText}>{new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</CustomText>
                    </PressableItem>

                )}
            />
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
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 95,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 5,
    },
    diaryText: {
        fontWeight: 'normal',
        fontSize: 13,
        marginVertical: 5,
    },
    dateText: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
    },
})