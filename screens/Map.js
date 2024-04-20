import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ route, navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    function confirmHandler() {
        if (selectedLocation) {
            if (route.params?.from === 'LocationManager') {
                navigation.navigate('PostDiary', {
                    ...route.params,
                    selectedLocation: selectedLocation,
                });
            }
        }
    }
    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: route.params?.locationInfo?.latitude || 37.78825,
                    longitude: route.params?.locationInfo?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => {
                    setSelectedLocation({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    });
                }}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            <Button
                disabled={!selectedLocation}
                title="Confirm Selected Location"
                onPress={confirmHandler}
            />
        </>
    );
}
const styles = StyleSheet.create({
    map: { flex: 1 },
});
