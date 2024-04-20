import { StyleSheet, View, Alert, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addCheckIn } from '../firebase-files/firestoreHelper';
import CustomText from '../components/CustomText';
import PressableButton from '../components/PressableButton';
import { formatDate } from '../helpers/dateHelper';
import { auth, storage } from '../firebase-files/firebaseSetup';
import ImageManager from '../components/ImageManager';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextInput, Switch, Card, HelperText, Chip, IconButton } from 'react-native-paper';
import * as Colors from '../components/Colors';
import LocationManager from '../components/LocationManager';
import { Styles } from '../components/Styles';

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
    const { fromDiary, formattedHabits } = route.params || {};
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    const [showImageButtons, setShowImageButtons] = useState(false);
    const [showMapButtons, setShowMapButtons] = useState(false);

    const inputTheme = {
        colors: {
            text: 'seagreen',
            primary: 'seagreen',
            underlineColor: 'transparent',
            background: '#FBFBFB',
        },
    };

    useEffect(() => {
        if (route.params?.selectedLocation) {
            setLocationInfo(route.params.selectedLocation);
        }
        if (route.params?.diary) {
            setDiary(route.params.diary);
            setIsPublic(route.params.isPublic);
            setTaskCompleted(route.params.taskCompleted);
            setSelectedHabitId(route.params.selectedHabitId);
            setImageUri(route.params.imageUri);
        }

    }, [route.params]);

    function handlePressHabit(habitId) {
        if (selectedHabitId === habitId) {
            setSelectedHabitId(null);
        } else {
            setSelectedHabitId(habitId);
        }

    }

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

        if (fromDiary) {
            if (!selectedHabitId) {
                Alert.alert("Error", "Please select a habit.");
                return;
            }
        }

        const habitIdToUse = habitId ? habitId : selectedHabitId;
        const newEntry = {
            diary,
            imageUri: imageUri || null,
            isPublic,
            taskCompleted,
            userId,
            habitId: habitIdToUse,
            date: date,
            location: locationInfo,
        };

        addCheckIn(newEntry)
            .then(() => {
                Alert.alert("Success", "Diary saved successfully!");
                navigation.navigate('Diary');
            })
            .catch((error) => {
                console.error("Error saving diary: ", error);
            });
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function imageButtonHandler() {
        setShowImageButtons(!showImageButtons);
    }

    function dismissImagePicker() {
        setShowImageButtons(false);
    }

    // handle map button press
    function mapButtonHandler() {
        setShowMapButtons(!showMapButtons);
    }

    // dismiss map picker
    function dismissMapPicker() {
        setShowMapButtons(false);
    }

    console.log(locationInfo)

    return (
        <ScrollView
            contentContainerStyle={Styles.scrollViewContent}
            nestedScrollEnabled={true}
        >
            <Card style={Styles.card}>
                <Card.Title title={formatDate(date)} titleNumberOfLines={2} titleStyle={Styles.postDiaryDate} />
                <Card.Content>
                    {imageUri &&
                        <Image source={{ uri: imageUri }} style={{ width: 50, height: 50 }} />}
                    <TextInput
                        label="Share your diary..."
                        value={diary}
                        onChangeText={setDiary}
                        style={Styles.postTextInput}
                        multiline
                        mode="outlined"
                        theme={inputTheme}
                        outlineStyle={Styles.outlineStyle}
                    />
                    <View style={Styles.buttonsContainer}>
                        <IconButton icon='image' size={30} onPress={() => imageButtonHandler()} />
                        <IconButton icon={locationInfo ? 'map-marker-check' : 'map-marker'} size={30} onPress={() => mapButtonHandler()} />
                    </View>
                    <ImageManager receiveImageURI={pickImageHandler} showImageButtons={showImageButtons} dismissImagePicker={dismissImagePicker} />
                    {fromDiary ? (
                        <>
                            <HelperText type="info" style={Styles.helperText}>
                                Choose a habit to associate with this diary.
                            </HelperText>
                            {formattedHabits.map(habit => (
                                <Chip
                                    icon={selectedHabitId === habit.id ? "heart" : "heart-outline"}
                                    key={habit.id}
                                    onPress={() => handlePressHabit(habit.id)}
                                    style={Styles.habitsChip}
                                    selected={selectedHabitId === habit.id}
                                >
                                    {habit.label}
                                </Chip>
                            ))}
                        </>
                    ) :
                        <View style={Styles.switchContainer}>
                            <CustomText style={Styles.customTextInPostDiary}>Today's Task Completed ? </CustomText>
                            <Switch
                                value={taskCompleted}
                                onValueChange={setTaskCompleted}
                                color='seagreen'
                            />
                        </View>}
                    <HelperText type="info" style={Styles.helperText}>
                        Making your diary public will allow others to view it.
                    </HelperText>
                    <View style={Styles.switchContainer}>
                        <CustomText style={Styles.customTextInPostDiary}>Public: </CustomText>
                        <Switch
                            value={isPublic}
                            onValueChange={setIsPublic}
                            color='seagreen'
                        />
                    </View>
                    <LocationManager
                        onLocationSelect={setLocationInfo}
                        currentData={{
                            habitId,
                            diary,
                            isPublic,
                            taskCompleted,
                            selectedHabitId,
                            formattedHabits,
                            fromDiary,
                        }}
                        showMapButtons={showMapButtons}
                        dismissMapPicker={dismissMapPicker}
                    />
                </Card.Content>
                <Card.Actions style={Styles.cardActions}>
                    <View style={Styles.postDiaryButtonsContainer}>
                        <PressableButton title="Save" onPress={saveDiary} color={Colors.fernGreen} textColor={Colors.white} />
                        <PressableButton title="Cancel" onPress={cancelHandler} color={Colors.white} textColor={Colors.fernGreen} />
                    </View>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}
