import { StyleSheet, Image, View, Button, Dimensions } from 'react-native'
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LocationManager({ onLocationSelect, currentData }) {
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
        navigation.navigate('Map', {
            from: 'LocationManager',
            ...currentData,
        });
    }

    return (
        <View style={styles.container} >
            <View style={styles.buttonContainer}>
                <Button title="User my current location" onPress={locateUserHandler} />
                <Button
                    title="Let me choose on the map"
                    onPress={chooseLocationHandler}
                />
            </View>
            {location && (
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
                        }}
                    />
                </View>

            )}
        </View>
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