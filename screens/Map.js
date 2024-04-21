import { View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import PressableButton from "../components/PressableButton";
import * as Colors from "../components/Colors";
import { Styles } from "../components/Styles";

/**
 * Provides a map interface for selecting a location.
 * Users can tap on the map to place a marker and then confirm the selection,
 * which navigates back with the selected location as parameters.
 */
export default function Map({ route, navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Function to handle confirmation of the selected location
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
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 4 }}
                initialRegion={{
                    latitude: route.params?.locationInfo?.latitude || 49.246292,
                    longitude: route.params?.locationInfo?.longitude || -123.116226,
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
            <View style={{ flex: 1 }}>
                <PressableButton
                    disabled={!selectedLocation}
                    title="Confirm Selected Location"
                    onPress={confirmHandler}
                    color={Colors.fernGreen}
                    customStyle={Styles.pressableButton}
                    textColor={Colors.white}
                />
            </View>
        </View>
    );
}

