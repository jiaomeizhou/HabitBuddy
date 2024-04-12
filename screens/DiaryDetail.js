import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card, Paragraph, Caption, Avatar, Divider, Title, useTheme } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { getUserProfileFromDB } from '../firebase-files/firestoreHelper';



export default function DiaryDetail({ route }) {
    const { diary } = route.params;
    const { colors } = useTheme();
    console.log("diary", diary)

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (diary.userId) {
            getUserProfileFromDB(diary.userId).then(setUserProfile);
        }
    }, [diary.userId]);
    console.log("userProfile", userProfile)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={`${userProfile ? userProfile.userName : 'Loading...'} - ${userProfile ? userProfile.petName : ''}`}
                    subtitle={`Pet status: ${userProfile ? userProfile.petStatus : ''}`}
                    left={(props) => userProfile && userProfile.avatarUrl ?
                        <Avatar.Image {...props} source={{ uri: userProfile.avatarUrl }} size={40} /> :
                        <Avatar.Icon {...props} icon="account" />}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                />
                {diary.imageUri && (
                    <Card.Cover source={{ uri: diary.imageUri }} style={styles.image} resizeMode="cover" />
                )}
                <Card.Content>
                    <Title style={styles.title}>
                        {diary.taskCompleted ? 'Check In Status: Completed' : 'Check In Status: Pending'}
                    </Title>
                    <Divider />
                    <Paragraph style={styles.paragraph}>
                        {diary.diary}
                    </Paragraph>
                    <Caption style={styles.dateText}>
                        Date: {new Date(diary.createdAt.seconds * 1000).toLocaleDateString()}
                    </Caption>

                    {diary.location && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: diary.location.latitude,
                                longitude: diary.location.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{ latitude: diary.location.latitude, longitude: diary.location.longitude }}
                                title={"Location"}
                                description={diary.diary}
                            />
                        </MapView>
                    )}
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 0,
    },
    card: {
        height: Dimensions.get("window").height,
        elevation: 5,
        borderRadius: 10,
        margin: 0,
        backgroundColor: 'rgba(243 246 240 / 0.9)'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5A7247',
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#6B8754',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5A7247',
    },
    paragraph: {
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 24,
        color: '#5A7247',
    },
    dateText: {
        fontSize: 14,
        marginTop: 10,
        color: '#5A7247',
    },
    map: {
        height: 200,
        width: '100%',
        marginTop: 10,
    },
    userInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
})