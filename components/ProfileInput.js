import {
    Button,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState } from "react";
import { Styles } from "./Styles";

// The ProfileInput component displays a modal with two input fields for user name and pet name.
export default function ProfileInput({ userInitialName, petInitialName, inputHandler, modalVisible, dismissModal }) {
    const [userName, setUserName] = useState(userInitialName);
    const [petName, setPetName] = useState(petInitialName);
    
    // callback handler for user name input
    function changeUserNameHandler(changedText) {
        setUserName(changedText);
    }

    // callback handler for pet name input
    function changePetNameHandler(changedText) {
        setPetName(changedText);
    }

    // callback handler for confirm button
    function confirmHandler() {
        inputHandler(userName, petName);
        setUserName("");
        setPetName("");
    }

    // callback handler for cancel button
    function cancelHandler() {
        setUserName("");
        // hide the modal
        dismissModal();
    }

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Name"
                        style={Styles.input}
                        value={userName}
                        onChangeText={changeUserNameHandler}
                    />
                    <TextInput
                        placeholder="Pet Name"
                        style={Styles.input}
                        value={petName}
                        onChangeText={changePetNameHandler}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonView}>
                            <Button title="Cancel" onPress={cancelHandler} />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                title="Confirm"
                                onPress={confirmHandler}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        width: "30%",
        margin: 5,
    },

    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: "10%",
        alignItems: "center",
    },
    buttonsContainer: { flexDirection: "row" },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "purple",
        width: "50%",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: { width: 100, height: 100 },
});