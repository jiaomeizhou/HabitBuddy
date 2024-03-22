import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Welcome from '../components/Welcome';

export default function Home() {

    return (
        <Welcome />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
