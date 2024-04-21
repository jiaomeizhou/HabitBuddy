import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { auth } from '../firebase-files/firebaseSetup';
import { fetchUserCheckInTrack } from '../firebase-files/firestoreHelper';
import { Styles } from '../components/Styles';

/**
 * Displays a map with markers indicating locations where the user has checked in.
 * Uses Firebase to fetch user-specific check-in data and displays each location as a marker on the map.
 * Initial map region is centered around a default location but will update based on the user's check-in data.
 */
export default function TrackMap() {
    const [locations, setLocations] = useState([]);
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const unsubscribe = fetchUserCheckInTrack(userId, setLocations);
        return () => unsubscribe();
    }, []);

    return (
        <View style={Styles.trackMapContainer}>
            <MapView
                style={Styles.trackMap}
                initialRegion={{
                    latitude: 49.246292,
                    longitude: -123.116226,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.diary}
                    />
                ))}
            </MapView>
        </View>
    )
}
