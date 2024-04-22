import { Image, View, Text } from 'react-native'
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dialog, Portal, Button } from "react-native-paper";
import { Styles } from "./Styles";
import PressableButton from "./PressableButton";
import * as Colors from "./Colors";

// This component handles location-related functionalities such as fetching current location,
// allowing user to pick a location from the map, and displaying current or selected location.
export default function LocationManager({ onLocationSelect, currentData, showMapButtons, dismissMapPicker }) {
    const navigation = useNavigation();
    const route = useRoute();
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.selectedLocation);
        }
    }, [route.params]);
    
    // Function to verify if the app has the necessary location permissions from the user.
    async function verifyPermission() {
        if (status.granted) {
            return true;
        }
        try {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } catch (err) {
            console.log(err);
        }
    }

    // Function to get the current location of the user.
    async function locateUserHandler() {
        try {
            const havePermission = await verifyPermission();
            if (!havePermission) {
                Alert.alert("You need to give permission");
                return;
            }
            const receivedLocation = await Location.getCurrentPositionAsync();
            const newLocation = {
                latitude: receivedLocation.coords.latitude,
                longitude: receivedLocation.coords.longitude,
            };
            setLocation(newLocation);
            onLocationSelect(newLocation);
        } catch (err) {
            console.log(err);
        }
    }

    // Function to handle choosing a location on the map.
    function chooseLocationHandler() {
        dismissMapPicker();
        navigation.navigate('Map', {
            from: 'LocationManager',
            ...currentData,
        });
    }
    return (
        <Portal >
            <Dialog visible={showMapButtons} onDismiss={dismissMapPicker} style={Styles.petMessageDialog}>
                <Dialog.Title>
                    <Text>Choose a location</Text>
                </Dialog.Title>
                <Dialog.Content>
                    {location && (
                        <View>
                            <Image
                                style={Styles.squareImage}
                                source={{
                                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
                                }}
                            />
                        </View>
                    )}
                    <View >
                        <PressableButton title="Use my current location" onPress={locateUserHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        <PressableButton title="Let me choose on the map" onPress={chooseLocationHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        {location && <Button icon='check' onPress={dismissMapPicker} textColor={Colors.chestnut} style={{ alignSelf: 'center' }}>Ok</Button>}
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}
