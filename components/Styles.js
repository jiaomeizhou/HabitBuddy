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
        marginHorizontal: 20,
        borderRadius: 10,
    },
    habitText: {
        fontSize: 18,
    }
})