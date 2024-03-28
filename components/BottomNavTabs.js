import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Diary from '../screens/Diary';
import PostDiary from '../screens/PostDiary';
import TopLeftNavIcon from './TopLeftNavIcon';

const Tab = createBottomTabNavigator();

export default function BottomNavTabs({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerLeft: () => (
                    <TopLeftNavIcon navigation={navigation} />
                ),
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Diary"
                component={Diary}
                options={{
                    tabBarLabel: 'Diary',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Post Diary"
                component={PostDiary}
                options={{
                    tabBarLabel: 'Post Diary',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="note" size={20} color={color} />
                    ),
                }}
            />
            {/* TODO: Add community Map screen  */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
