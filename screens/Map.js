import { View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import PressableButton from "../components/PressableButton";
import * as Colors from "../components/Colors";
import { Styles } from "../components/Styles";

// The Map component is used to display a map to the user where they can select a location.
// When a location is selected and confirmed, it is passed back to the navigation route.
export default function Map({ route, navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Handler for the confirm button
    // Navigates back to the PostDiary screen with the selected location data
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

