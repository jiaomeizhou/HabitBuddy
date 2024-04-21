import { ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card, Paragraph, Caption, Avatar, Divider, Title } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { getUserProfileFromDB } from '../firebase-files/firestoreHelper';
import { Styles } from '../components/Styles';


/**
 * Displays detailed information about a diary entry selected from a list.
 * Features include user profile display with an avatar, diary content, status of the diary task,
 * and a map showing the diary's location if available. 
 */
export default function DiaryDetail({ route }) {
    const { diary } = route.params;
    const [userProfile, setUserProfile] = useState(null);

    // Fetch user profile from the database when component mounts or diary's userId changes.
    useEffect(() => {
        if (diary.userId) {
            getUserProfileFromDB(diary.userId).then(setUserProfile);
        }
    }, [diary.userId]);

    return (
        <ScrollView contentContainerStyle={Styles.diaryDetailContainer}>
            <Card style={Styles.diaryDetailCard}>
                <Card.Title
                    title={`${userProfile ? userProfile.userName : 'Loading...'} - ${userProfile ? userProfile.petName : ''}`}
                    subtitle={`Pet status: ${userProfile ? userProfile.petStatus : ''}`}
                    left={(props) => userProfile && userProfile.avatarUrl ?
                        <Avatar.Image {...props} source={{ uri: userProfile.avatarUrl }} size={40} /> :
                        <Avatar.Icon {...props} icon="account" />}
                    titleStyle={Styles.diaryDetailCardTitle}
                    subtitleStyle={Styles.diaryDetailCardSubtitle}
                />
                {diary.imageUri && (
                    <Card.Cover source={{ uri: diary.imageUri }} style={Styles.diaryDetailImage} resizeMode="cover" />
                )}
                <Card.Content>
                    <Title style={Styles.diaryDetailTitle}>
                        {diary.diary}
                    </Title>
                    <Divider />
                    <Paragraph style={Styles.diaryDetailParagraph}>
                        {diary.taskCompleted ? 'Check In Status: Completed' : 'Check In Status: Pending'}
                    </Paragraph>
                    <Caption style={Styles.diaryDetailDateText}>
                        Date: {new Date(diary.createdAt.seconds * 1000).toLocaleDateString()}
                    </Caption>

                    {diary.location && (
                        <MapView
                            style={Styles.diaryDetailMap}
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
                                title={"Content:"}
                                description={diary.diary}
                            />
                        </MapView>
                    )}
                </Card.Content>
            </Card>
        </ScrollView>
    );
}