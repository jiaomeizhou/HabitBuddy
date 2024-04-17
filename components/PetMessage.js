import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function PetMessage() {
    const [petMessage, setPetMessage] = useState("")

    useEffect(() => {
        async function getPetMessageFromAPI() {
            // fetch data from API
            try {
                const response = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const data = await response.json();
                const fact = data.data[0].attributes.body;
                if (fact) {
                    setPetMessage(fact);
                }
                else {
                    setPetMessage("I don't want to be petted right now.");
                }
            } catch (error) {
                console.error(error)
            }
        }
        getPetMessageFromAPI();
    }, []);

    return (
        <View>
            <Text>{petMessage}</Text>
        </View>
    )
}