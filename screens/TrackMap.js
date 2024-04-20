import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { auth } from '../firebase-files/firebaseSetup';
import { fetchUserCheckInTrack } from '../firebase-files/firestoreHelper';


export default function TrackMap() {
    const [locations, setLocations] = useState([]);
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const unsubscribe = fetchUserCheckInTrack(userId, setLocations);
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})