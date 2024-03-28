import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import TopLeftNavIcon from './TopLeftNavIcon';
import Diary from '../screens/Diary';
import PostDiary from '../screens/PostDiary';

const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {

    return (
        <Tab.Navigator >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                    headerLeft: () => (
                        <TopLeftNavIcon />
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
                    headerLeft: () => (
                        <TopLeftNavIcon />
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
                    headerLeft: () => (
                        <TopLeftNavIcon />
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
                    headerLeft: () => (
                        <TopLeftNavIcon />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}