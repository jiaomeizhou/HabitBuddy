import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Diary from '../screens/Diary';
import TopLeftNavIcon from './TopLeftNavIcon';
import * as Colors from './Colors';
import TrackMap from '../screens/TrackMap';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomNavTabs({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerLeft: () => (
                    <TopLeftNavIcon navigation={navigation} />
                ),
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    style={{ backgroundColor: Colors.lightGreen }}
                    activeIndicatorStyle={{ backgroundColor: Colors.camBlue }}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return label;
                    }}
                />
            )}
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
                name="Track"
                component={TrackMap}
                options={{
                    tabBarLabel: 'My Track',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="map" size={24} color={color} />
                    ),
                }}
            />
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
