import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function Home({ navigation }) {

    const [date,setDate] = useState([])

    useEffect(() => {
        const today = new Date();
            const week = Math.ceil((((today - new Date(today.getFullYear(), 0, 1)) / 86400000) + 1) / 7);
                const date = today.toLocaleDateString("sv-SE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

        setDate({ week:week,date: date });
    }, [])

return (
    <View style={styles.container}>
        <Text>Vecka:{date.week}</Text>
        <Text>{date.date}</Text>
    <View style={styles.buttonContainer}>
    <Button
        title="Go to News"
        onPress={() => navigation.navigate('News')}
    />
    </View>
    <View style={styles.buttonContainer}>
    <Button
        title="Go to Weather"
        onPress={() => navigation.navigate('Weather')}
    />
    </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});

export default Home;