import { StyleSheet, Image, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dialog, Portal, IconButton, Button } from "react-native-paper";
import { Styles } from "./Styles";
import PressableButton from "./PressableButton";
import * as Colors from "./Colors";

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
                <Dialog.Title>Choose a location</Dialog.Title>
                <Dialog.Content>
                    {location && (
                        <View>
                            <Image
                                style={Styles.squareImage}
                                source={{
                                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
                                }}
                            />
                            <View style={Styles.diaryButtonsContainer}>
                                <Button icon='check' onPress={dismissMapPicker} textColor={Colors.chestnut}>Ok</Button>
                            </View>
                        </View>
                    )}
                    <View >
                        <PressableButton title="Use my current location" onPress={locateUserHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        <PressableButton title="Let me choose on the map" onPress={chooseLocationHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        <IconButton icon='window-close' size={30} onPress={dismissMapPicker} style={{ alignSelf: 'flex-end' }} />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        marginTop: 12,
        width: Dimensions.get("window").width - 40,
        height: 200,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});