import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { Styles } from "../components/Styles";
import PressableButton from "../components/PressableButton";
import * as Colors from "../components/Colors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    navigation.navigate("Signup");
  };
  const loginHandler = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredential: ", userCredential);
    }
    catch (error) {
      if (!email || !password) {
        Alert.alert("Please fill in all the fields");
        return;
      }
      console.log("error", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Email already in use");
      }
      else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "Weak password");
      }
      else if (error.code === "auth/invalid-credential") {
        Alert.alert("Error", "Invalid email or password");
      }
      else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Invalid email address");
      }
    }
  };

  // If user forgot password, send a password reset email
  function forgotPasswordHandler() {
    try {
      if (!email) {
        Alert.alert("Please enter your email address");
        return;
      }
      // TODO: if the email address is not in the db, it will throw an error
      sendPasswordResetEmail(auth, email);
      Alert.alert("Password reset email sent to your email address");
    }
    catch (error) {
      console.log("error", error);
    }
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={Styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
        autoCapitalize="none"
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
        autoCapitalize="none"
      />
      <PressableButton title="Log in" onPress={loginHandler} color={Colors.fernGreen} customStyle={Styles.pressableButton} textColor={Colors.white} />
      <PressableButton title="New User? Create An Account" onPress={signupHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
      <View style={Styles.forgotPasswordButton}>
        <PressableButton title="Forgot Password?" onPress={forgotPasswordHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.pink} />
      </View>
    </View>
  );
}