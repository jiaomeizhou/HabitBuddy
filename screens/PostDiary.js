import { StyleSheet, View, Alert, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { addCheckIn } from '../firebase-files/firestoreHelper';
import CustomText from '../components/CustomText';
import PressableButton from '../components/PressableButton';
import { formatDate } from '../helpers/dateHelper';
import { auth, storage } from '../firebase-files/firebaseSetup';
import { useFocusEffect } from '@react-navigation/native';
import ImageManager from '../components/ImageManager';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextInput, Switch, Card, HelperText } from 'react-native-paper';
import * as Colors from '../components/Colors';
import LocationManager from '../components/LocationManager';

export default function PostDiary({ navigation, route }) {
    const [imageUri, setImageUri] = useState(null);
    const [diary, setDiary] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [locationInfo, setLocationInfo] = useState(null);
    const userId = auth.currentUser.uid;
    const habit = route.params ? route.params : null;
    const habitData = habit.habitObj;
    const habitId = habitData ? habitData.id : null;
    const date = new Date();

    const inputTheme = {
        colors: {
            text: 'seagreen',
            primary: 'seagreen',
            underlineColor: 'transparent',
            background: '#FBFBFB',
        },
    };

    useFocusEffect(
        useCallback(() => {
            setImageUri(null);
            setDiary('');
            setIsPublic(true);
            setTaskCompleted(false);
        }, [])
    );

    useEffect(() => {
        if (route.params?.selectedLocation) {
            setLocationInfo(route.params.selectedLocation);
        }
    }, [route.params?.selectedLocation]);

    async function getImageData(uri) {
        try {
            const response = await fetch(uri);
            const imageBlob = await response.blob();
            const imageName = uri.substring(uri.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytes(imageRef, imageBlob);
            return await getDownloadURL(uploadResult.ref);
        } catch (err) {
            Alert.alert("Upload Error", "Failed to upload image.");
        }
    }

    async function pickImageHandler(uri) {
        const uploadedImageUrl = await getImageData(uri);
        if (uploadedImageUrl) {
            setImageUri(uploadedImageUrl);
        }
    }

    function saveDiary() {
        if (!diary.trim()) {
            Alert.alert("Error", "Please add your diary.");
            return;
        }

        const newEntry = {
            diary,
            imageUri,
            isPublic,
            taskCompleted,
            userId,
            habitId,
            date: date,
            location: locationInfo,
        };

        addCheckIn(newEntry)
            .then(() => {
                Alert.alert("Success", "Diary saved successfully!");
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.error("Error saving diary: ", error);
            });
    }

    function cancelHandler() {
        navigation.goBack();
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Card style={styles.card}>
                <Card.Title title={formatDate(date)} titleNumberOfLines={2} titleStyle={styles.date} />
                <Card.Content>
                    <ImageManager receiveImageURI={pickImageHandler} />
                    <TextInput
                        label="Share your diary..."
                        value={diary}
                        onChangeText={setDiary}
                        style={styles.textInput}
                        multiline
                        mode="outlined"
                        theme={inputTheme}
                        outlineStyle={styles.outlineStyle}
                    />
                    <View style={styles.row}>
                        <CustomText style={styles.customText}>Today's Task Completed ? </CustomText>
                        <Switch
                            value={taskCompleted}
                            onValueChange={setTaskCompleted}
                            color='seagreen'
                        />
                    </View>
                    <View style={styles.row}>
                        <CustomText style={styles.customText}>Public: </CustomText>
                        <Switch
                            value={isPublic}
                            onValueChange={setIsPublic}
                            color='seagreen'
                        />
                    </View>
                    <HelperText type="info" style={styles.helperText}>
                        Making your diary public will allow others to view it.
                    </HelperText>
                    <View style={styles.row}>
                        <LocationManager onLocationSelect={setLocationInfo} />
                    </View>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                    <View style={styles.buttonsContainer}>
                        <PressableButton title="Save" onPress={saveDiary} color={Colors.fernGreen} textColor={Colors.white} />
                        <PressableButton title="Cancel" onPress={cancelHandler} color={Colors.white} textColor={Colors.fernGreen} />
                    </View>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    customText: {
        color: '#5A7247',
    },
    helperText: {
        fontSize: 13,
        color: '#5A7247',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
    },
    card: {
        margin: 5,
        elevation: 4,
        backgroundColor: 'rgba(232 241 226 / 0.9)'
    },
    cardActions: {
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    date: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#5A7247',
    },
    textInput: {
        height: 80,
        marginVertical: 10,
        padding: 10,
    },
    outlineStyle: {
        borderWidth: 1,
        borderColor: '#5A7247',
        borderRadius: 10,
    },
    buttonsContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})