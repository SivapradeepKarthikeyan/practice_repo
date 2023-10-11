import React from 'react'
import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ScrollCoinsTemplate(props) {

    //ViewClicked
    const navigation = useNavigation();
    const viewClicked = () => {
        //data to be sent
        //sending as JSON
        const data = {
            coinId: props.id,
            coinName: props.name,
            coinImage: props.image,
            full_object: props.full_object
        };
        navigation.navigate('CoinDetail', { data });
    }

    //Color Check
    let isHigh = true;
    if (props.price_change_percentage_24h < 0) {
        isHigh = false;
    }

    return (
        <View style={{ margin: 1, padding: 5 }}>
            <View style={styles.container}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <View>
                    <Text style={styles.details_Id}>{props.name}</Text>
                    <Text style={styles.details_Price}>{props.current_price}</Text>
                </View>
                <Text style={isHigh ? styles.high : styles.low}>{props.price_change_percentage_24h}%</Text>
                <Text style={{ color: 'skyblue', fontStyle: "italic", fontWeight: '400' }} onPress={viewClicked}>View</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            height: 100,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#0C090A', //night black
            borderRadius: 25,

        },

        image: {
            height: 60,
            width: 60,
            borderRadius: 5
        },

        details_Id: {
            color: 'white',
            fontSize: 14,
            fontStyle: "italic"
        },

        details_Price: {
            color: 'white',
            fontSize: 13,
            fontStyle: "italic"
        },

        high: {
            color: 'green',
            fontSize: 13
        },
        low: {
            color: 'red',
            fontSize: 13
        }
    }
)
