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
        alignItems: 'center',
        marginTop: 60,
    },
    petImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 20,
    },
    statusText: {
        padding: 20,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
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
    habitDetailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    habitText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressText: {
        fontSize: 18,
        marginTop: 10,
    },
    checkInText: {
        fontSize: 18,
        marginTop: 10,
        
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    menu: {
        position: 'absolute',
        top: 100,
        left: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
})