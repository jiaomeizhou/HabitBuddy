import { View, Text, Button, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Welcome from '../components/Welcome';
import HabitItem from '../components/HabitItem';

export default function Home() {
    const [checked, setChecked] = useState(false);
    habitObj = {
        name: 'Habit 1',
        progress: 0,
        checked: checked,
    }
    console.log(habitObj);

    toggleCheck = () => {
        setChecked(!checked);
    }

    return (
        // <Welcome />
        <HabitItem habitObj={habitObj} onPress={() => alert('Habit item pressed')} toggleCheck={toggleCheck}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
