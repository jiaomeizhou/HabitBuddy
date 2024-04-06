import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { addUserToDB } from "../firebase-files/firestoreHelper";
import { Styles } from "../components/Styles";
import * as Colors from "../components/Colors";
import PressableButton from "../components/PressableButton";

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await addUserToDB(userCredential.user.uid, { email: email });
            await sendEmailVerification(userCredential.user);
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
        <View style={Styles.container}>
            <Text style={Styles.label}>Email</Text>
            <TextInput
                style={Styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(changedText) => {
                    setEmail(changedText);
                }}
            />
            <Text style={Styles.label}>Password</Text>
            <TextInput
                style={Styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                    setPassword(changedText);
                }}
            />
            <Text style={Styles.label}>Confirm Password</Text>
            <TextInput
                style={Styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(changedText) => {
                    setConfirmPassword(changedText);
                }}
            />
            <PressableButton title="SIGN UP" onPress={signupHandler} color={Colors.fernGreen} customStyle={Styles.pressableButton} textColor={Colors.white}/>
            <PressableButton title="Already Have a Account? Sign In" onPress={loginHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen}/>
        </View>
    );
}
