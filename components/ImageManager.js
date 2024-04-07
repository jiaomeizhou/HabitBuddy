import { View, Text, Button, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import PressableButton from './PressableButton'
import * as Colors from './Colors'
import { Styles } from './Styles'


export default function ImageManager({ receiveImageURI, initialImage }) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = React.useState(initialImage || null);

    async function verifyPemission() {
        if (status !== 'granted') {
            result = await requestPermission();
            return result;
        }
        else {
            return true;
        }
    }

    // take image by camera
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

    // upload image from gallery
    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                receiveImageURI(result.assets[0].uri);
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error picking image from gallery:', error);
        }
    };

    return (
        <View>
            {imageURI &&
                <Image source={{ uri: imageURI }} style={Styles.image} />
            }
            <View style={Styles.buttonContainer}>
                <PressableButton title="Take a Photo" onPress={takeImageHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                <PressableButton title="Choose from Gallery" onPress={pickImageFromGallery} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
            </View>
        </View>
    )
}