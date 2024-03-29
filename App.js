import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BottomNavTabs from './components/BottomNavTabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import { auth } from "./firebase-files/firebaseSetup";
import AddHabitScreen from './screens/AddHabitScreen';
import EditHabitScreen from './screens/EditHabitScreen';
import HabitDetail from './screens/HabitDetail';
import Checkin from './screens/Checkin';
import { FontAwesome6 } from '@expo/vector-icons';
import TopLeftNavIcon from './components/TopLeftNavIcon';


import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import DiaryDetail from './screens/DiaryDetail';
import PostDiary from './screens/PostDiary';

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
          <>
            <Stack.Screen
              name="BottomNavTabs"
              component={BottomNavTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="AddHabit" component={AddHabitScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Add a Habit",
              }}
            />
            <Stack.Screen name="EditHabit" component={EditHabitScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Edit a Habit",
              }}
            />
            <Stack.Screen
              name="HabitDetail"
              component={HabitDetail}
            />
            <Stack.Screen
              name='PostDiary' component={PostDiary}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Post Diary",
              }}
            />
            <Stack.Screen name='DiaryDetail' component={DiaryDetail}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Diary Detail",
              }}
            />
          </>
          : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


