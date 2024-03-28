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

export default function ProfileInput({ inputHandler, modalVisible, dismissModal }) {
    const [name, setName] = useState("");

    // callback handler
    function changeTextHandler(changedText) {
        setName(changedText);
    }

    function confirmHandler() {
        inputHandler(name);
        setName("");
    }
    function cancelHandler() {
        setName("");
        // hide the modal
        dismissModal();
    }

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={changeTextHandler}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonView}>
                            <Button title="Cancel" onPress={cancelHandler} />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                title="Confirm"
                                onPress={confirmHandler}
                                disabled={!name}
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