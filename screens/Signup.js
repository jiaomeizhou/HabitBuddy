import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";

export default function Signup({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loginHandler = () => {
        navigation.replace("Login");
    };
    const signupHandler = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Please fill in all the fields");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        try {
            createUserWithEmailAndPassword(auth, email, password)
        }
        catch (error) {
            console.log("error", error);
            if (error.code === "auth/email-already-in-use") {
                Alert.alert("Error", "Email already in use");
            }
            else if (error.code === "auth/weak-password") {
                Alert.alert("Error", "Weak password");
            }
        }

    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(changedText) => {
                    setEmail(changedText);
                }}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                    setPassword(changedText);
                }}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(changedText) => {
                    setConfirmPassword(changedText);
                }}
            />
            <Button title="Register" onPress={signupHandler} />
            <Button title="Already Registered? Login" onPress={loginHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "stretch",
        justifyContent: "center",
    },
    input: {
        borderColor: "#552055",
        borderWidth: 2,
        width: "90%",
        margin: 5,
        padding: 5,
    },
    label: {
        marginLeft: 10,
    },
});