import { StyleSheet } from 'react-native'
import * as Colors from './Color'

export const Styles = StyleSheet.create({
    pressedView: {
        opacity: 0.5,
    },
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        borderWidth: 2,
        borderColor: Colors.primaryPurpleColor,
        backgroundColor: Colors.headerColorPurple,
        padding: 10,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    habitText: {
        fontSize: 18,
    },
    habitList: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
    },
    petContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200,
    },
    petImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        marginBottom: 5,
        marginTop: 5,
    },
    progressLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 5,
    },
})