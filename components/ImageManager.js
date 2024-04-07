import { View, Text, Button, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'


export default function ImageManager({ title, receiveImageURI }) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = React.useState(null);

    async function verifyPemission() {
        if (status !== 'granted') {
            result = await requestPermission();
            return result;
        }
        else {
            return true;
        }
    }

    const takeImageHandler = async () => {
        try {
            const havePermission = verifyPemission();
            console.log(havePermission)
            if (!havePermission) {
                alert('Permission to access camera is required');
                return;
            }
            const results = await ImagePicker.launchCameraAsync(
                {
                    allowsEditing: true,
                }
            )
            uri = results.assets[0].uri;
            receiveImageURI(uri);
            setImageURI(uri);
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <Button title={title} onPress={takeImageHandler} />
            {imageURI &&
                <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />
            }
        </View>
    )
}