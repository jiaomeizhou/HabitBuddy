import { View, Button, StyleSheet, Pressable, Modal, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { Styles } from './Styles';


const Stack = createNativeStackNavigator();

export default function TopLeftNavIcon({ navigation }) {
    const [showMenu, setShowMenu] = useState(false);

    function onPressAddHabit() {
        navigation.navigate('AddHabit');
        setShowMenu(false);
    }

    return (
        <View>
            <Pressable onPress={() => setShowMenu(!showMenu)} >
                <Entypo name="menu" size={24} color="black" />
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
                        <Button title="Log out" onPress={() => signOut(auth)} />
                    </View>
                )}
            </Modal>

        </View>
    );
}
