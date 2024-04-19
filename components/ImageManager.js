import { View, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import PressableButton from './PressableButton'
import * as Colors from './Colors'
import { Styles } from './Styles'
import { Portal, Dialog, IconButton, Button } from 'react-native-paper'


export default function ImageManager({ receiveImageURI, initialImage, showImageButtons, dismissImagePicker }) {
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
                    quality: 0,
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
                quality: 0,
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
        <Portal >
            <Dialog visible={showImageButtons} onDismiss={dismissImagePicker} style={Styles.petMessageDialog}>
                <Dialog.Title>Choose a photo</Dialog.Title>
                <Dialog.Content>
                    {imageURI &&
                        <View>
                            <Image source={{ uri: imageURI }} style={Styles.squareImage} />
                            <View style={Styles.diaryButtonsContainer}>
                                <Button icon='check' onPress={dismissImagePicker} textColor={Colors.chestnut}>Ok</Button>
                            </View>
                        </View>
                    }
                    <View>
                        <PressableButton title="Take a Photo" onPress={takeImageHandler} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        <PressableButton title="Choose from Gallery" onPress={pickImageFromGallery} color={Colors.white} customStyle={Styles.pressableButton} textColor={Colors.fernGreen} />
                        <IconButton icon='window-close' size={30} onPress={dismissImagePicker} style={{ alignSelf: 'flex-end' }} />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}