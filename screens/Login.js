import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";

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
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
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
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandler} />
      <Button title="Forgot Password?" onPress={forgotPasswordHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
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