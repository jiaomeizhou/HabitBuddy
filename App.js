import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavTabs from './components/BottomNavTabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import { auth } from "./firebase-files/firebaseSetup";


import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();
export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  console.log("userLoggedIn: ", userLoggedIn);

  // check if user is logged in， if no useEffect, it will check every time
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  const AuthStack = <>
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </>


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userLoggedIn ?
          <Stack.Screen
            name="BottomNavTabs"
            component={BottomNavTabs}
            options={{ headerShown: false }}
          /> : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


