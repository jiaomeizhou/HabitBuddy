import { View, Button, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";


const Stack = createNativeStackNavigator();

export default function TopLeftNavIcon() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <View>
            <Pressable onPress={() => setShowMenu(!showMenu)} >
                <Entypo name="menu" size={24} color="black" />
            </Pressable>

            {showMenu && (
                <View style={styles.menu}>
                    <Button title="Add a habit" onPress={() => alert('Navigate to add a habit page')} />
                    <Button title="Log out" onPress={() => signOut(auth)} />
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        position: 'absolute',
        top: 30,
        left: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
