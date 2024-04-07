import { StyleSheet } from 'react-native'
import * as Colors from "./Colors";

export const Styles = StyleSheet.create({
    pressedView: {
        opacity: 0.5,
    },
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        borderWidth: 2,
        padding: 10,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        alignSelf: 'center',
        borderColor: Colors.feldGrau,
        backgroundColor: Colors.white,
    },
    habitText: {
        fontSize: 18,
        color: Colors.feldGrau,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    habitListContainer: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
    },
    petContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 20,
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.pink,
    },
    progressBarContainer: {
        marginBottom: 5,
        marginTop: 5,
        width: '30%',
        alignSelf: 'center',
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.feldGrau,
    },
    progressBar: {
        height: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.battleshipGrey,
        borderWidth: 1,
        borderRadius: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: Colors.fernGreen,
        borderRadius: 5,
    },
    habitDetailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
        elevation: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    welcomeContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: Colors.feldGrau,
        borderWidth: 2,
        width: "80%",
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: Colors.white,

    },
    label: {
        width: "80%",
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.feldGrau,
    },
    pressableButton: {
        alignSelf: "center",
        width: "80%",
        height: 50,
        borderRadius: 10,
        margin: 10,
        borderColor: Colors.feldGrau,
        borderWidth: 1,
    },
    forgotPasswordButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '80%',
    },
    statsCard: {
        backgroundColor: Colors.pink,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: 150,
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    statsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    statsLable: {
        fontSize: 15,
        color: Colors.white,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 5,
        alignSelf: 'center',
        color: Colors.feldGrau,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.silver,
    },
    habitButtonsContainer: {
        width: '80%',
    },
    categoryButton: {
        marginHorizontal: 2,
        marginBottom: 10,
    },
    shortcutContainer: {
        borderColor: Colors.feldGrau,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '40%',
        marginBottom: 10,
        padding: 5,
    },
    shortcutButton: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    iconButton: {
        margin: 5,
    },
    habitDetailContainer: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 50,
    },
    habitDetailText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.feldGrau,
        alignSelf: 'center',
        margin: 5,
    },
    calendar: {
        borderWidth: 1,
        borderColor: Colors.battleshipGrey,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
    },
})