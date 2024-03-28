import { StyleSheet, View, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { addCheckIn } from '../firebase-files/firestoreHelper';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomText from '../components/CustomText';
import PressableButton from '../components/PressableButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomSwitch from '../components/CustomSwitch';
import { formatDate } from '../helpers/dateHelper';
import { auth } from '../firebase-files/firebaseSetup';
import { useFocusEffect } from '@react-navigation/native';


export default function PostDiary({ navigation, route }) {
    const [imageUri, setImageUri] = useState(null);
    const [diary, setDiary] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const userId = auth.currentUser.uid;

    useFocusEffect(
        useCallback(() => {
            setImageUri(null);
            setDiary('');
            setIsPublic(true);
            setTaskCompleted(false);
        }, [])
    );
    function pickImageHandler() {
        // TODO: complete pick image function
    }

    function saveDiary() {
        // if (!diary.trim() || !imageUri) {
        if (!diary.trim()) {
            Alert.alert("Error", "Please add an image and your diary.");
            return;
        }

        // TODO: get userId habitId then save them to the database
        const habitId = "habit-id-placeholder"; // Use actual habit ID

        const newEntry = {
            diary,
            imageUri,
            isPublic,
            taskCompleted,
            userId,
            habitId,
        };

        addCheckIn(newEntry)
            .then(() => {
                Alert.alert("Success", "Diary saved successfully!");
                navigation.goBack();
            })
            .catch((error) => {
                console.error("Error saving diary: ", error);
            });
    }

    function cancelHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CustomText style={styles.date}>{formatDate(new Date())}</CustomText>
            <PressableButton title="Upload Image" onPress={pickImageHandler} color='#2196F3' />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <CustomTextInput
                placeholder="Share your diary..."
                value={diary}
                onChangeText={setDiary}
                style={styles.textInput}
                multiline
            />

            <CustomSwitch
                label="Public : "
                onValueChange={setIsPublic}
                value={isPublic}
            />

            <CustomCheckBox
                text="Today's Task Completed ? "
                value={taskCompleted}
                onValueChange={setTaskCompleted}
            />

            <View style={styles.buttonsContainer}>
                <PressableButton title="Save" onPress={saveDiary} color='#2196F3' />
                <PressableButton title="Cancel" onPress={cancelHandler} color='#B0ADAD' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    date: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    textInput: {
        height: 100,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#A9A4A4',
        padding: 10,
    },
    buttonsContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})