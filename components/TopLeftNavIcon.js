import { View, Button, StyleSheet, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { Styles } from './Styles';
import * as Colors from './Colors';
import PressableButton from './PressableButton';
import IconButton from './IconButton';


const Stack = createNativeStackNavigator();

export default function TopLeftNavIcon({ navigation }) {
    const [showMenu, setShowMenu] = useState(false);

    function onPressAddHabit() {
        navigation.navigate('AddHabit');
        setShowMenu(false);
    }

    return (
        <View>
            <IconButton onPress={() => setShowMenu(!showMenu)}  >
                <Entypo name="menu" size={24} color={Colors.feldGrau} style={Styles.iconButton} />
            </IconButton>
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
                        <PressableButton title="Add habit" onPress={onPressAddHabit} color={Colors.fernGreen} customStyle={Styles.pressableButton} textColor={Colors.white} />
                        {/* <PressableButton title="Log out" onPress={onPressLogOut} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} /> */}
                    </View>
                )}
            </Modal>

        </View>
    );
}
