import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavTabs from './components/BottomNavTabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import { auth } from "./firebase-files/firebaseSetup";

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();
export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  console.log("userLoggedIn: ", userLoggedIn);

  return (
    <NavigationContainer>
      <BottomNavTabs />
    </NavigationContainer>
  );
}


