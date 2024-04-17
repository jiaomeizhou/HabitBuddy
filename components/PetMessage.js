import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Card, Dialog, Portal, Button } from 'react-native-paper';
import { Styles } from './Styles';

export default function PetMessage() {
    const [petMessage, setPetMessage] = useState('');
    const [visible, setVisible] = useState(false); // State for controlling dialog visibility

    useEffect(() => {
        async function getPetMessageFromAPI() {
            // fetch data from API
            try {
                const response = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const data = await response.json();
                const fact = data.data[0]?.attributes?.body;
                if (fact) {
                    setPetMessage(fact);
                    setVisible(true); // Show the dialog when there is a pet message
                } else {
                    setPetMessage("I don't want to be petted right now.");
                    setVisible(true); // Show the dialog with default message
                }
            } catch (error) {
                console.error(error);
            }
        }
        getPetMessageFromAPI();
    }, []);

    const hideDialog = () => setVisible(false); // Function to hide the dialog

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={Styles.petMessageDialog}>
                    <Dialog.Title></Dialog.Title>
                    <Dialog.Content>
                        <Text>{petMessage}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}
