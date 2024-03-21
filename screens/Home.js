import { View, Text, Button, StyleSheet} from 'react-native'
import React from 'react'

export default function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Button title="Create your own habit" onPress={() => alert('Button pressed')} />
            <View style={styles.buttonsContainer}>
                <Button title="health" onPress={() => alert('Button pressed')} />
                <Button title="study" onPress={() => alert('Button pressed')} />
                <Button title="life" onPress={() => alert('Button pressed')} />
                <Button title="sport" onPress={() => alert('Button pressed')} />
                <Button title="work" onPress={() => alert('Button pressed')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '50%',
    },
});
