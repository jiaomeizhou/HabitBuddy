import { View, Button, StyleSheet, Pressable, Modal, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { Styles } from './Styles';
import * as Colors from './Colors';


const Stack = createNativeStackNavigator();

export default function TopLeftNavIcon({ navigation }) {
    const [showMenu, setShowMenu] = useState(false);

    function onPressAddHabit() {
        navigation.navigate('AddHabit');
        setShowMenu(false);
    }

    // TODO: there is a bug here, the app will crash if the user logs out
    // only iOS, not Android
    async function onPressLogOut() {
        try {
            await signOut(auth);
            // After successful sign-out, navigate to the login screen
            navigation.navigate('Login');
        } catch (error) {
            console.log("Error signing out: ", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
        }
    }

    return (
        <View>
            <Pressable onPress={() => setShowMenu(!showMenu)} >
                <Entypo name="menu" size={24} color={Colors.feldGrau} style={Styles.iconButton}/>
            </Pressable>
            <Modal
                visible={showMenu}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowMenu(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
                    <View style={Styles.overlay} />
                </TouchableWithoutFeedback>

                {showMenu && (
                    <View style={Styles.menu}>
                        <Button title="Add a habit" onPress={onPressAddHabit} />
                        <Button title="Log out" onPress={onPressLogOut} />
                    </View>
                )}
            </Modal>

        </View>
    );
}
