import React, { useEffect, useState, Span } from 'react'
import { StyleSheet, View, Text, Button, Image, TextInput, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native';
import Axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Action() {

    //Route
    const route = useRoute();

    //Navigation
    const navigation = useNavigation();


    //Data
    const data = route.params;
    const full_object = data.full_object;


    let coinName = data?.coinName;
    let coinPrice = parseInt(full_object.full_object.current_price);


    //Variables
    const [coinData, setCoinData] = useState({})
    const [quantity, setQuantity] = useState('')
    const [totalCost, setTotalCost] = useState(0)
    const [userName, setUserName] = useState('');
    const [isHigh, setIsHigh] = useState(false);

    //useEffect
    useEffect(() => {
        setCoinData({})
        //Get the useName
        async function getUserName() {
            try {
                const username = await SecureStore.getItemAsync('userName');
                if (username) {
                    console.log('Username Retrived  (Action In) ->', username);
                    setUserName(username)
                }
            } catch (error) {
                console.error('Error retrieving username:', error);
            }
        }
        getUserName();

        //Check isHigh
        if (full_object.full_object.price_change_percentage_24h > 0)
            setIsHigh(true)
        else
            setIsHigh(false);


    }, [])

    //useEffect
    useEffect(() => {
        if (totalCost === NaN)
            setTotalCost('0')
    }, [totalCost])

    //Functions
    const setQuantity_ = (text) => {
        //const cleanedText = text.replace(/[^0-9]/g, '');
        setQuantity(parseFloat(text));
        setTotalCost(parseFloat(parseFloat(text) * parseFloat(full_object.full_object.current_price)))
    };

    const buyCoin = async () => {
        //User Object
        const userDetails =
        {
            "userStocksList": [
                {
                    "stockName": coinName,
                    "stockPrice": coinPrice,
                    "stockQuantity": quantity
                }

            ]
        }
        console.log(`http://192.168.1.2:8085/buyStock/${userName}`)
        console.log(userDetails)
        try {
            const response = await Axios.put(`http://192.168.1.2:8085/buyStock/${userName}`, userDetails)
            ToastAndroid.show(`${coinName} bought successfully`, ToastAndroid.LONG);

        } catch (error) {
            console.log(error.message)
            ToastAndroid.show(`Insufficient Balance`, ToastAndroid.CENTER)

        }
    }

    const sellCoin = async () => {
        //User Object
        const userDetails =
        {
            "userStocksList": [
                {
                    "stockName": coinName,
                    "stockPrice": coinPrice,
                    "stockQuantity": quantity
                }

            ]
        }
        console.log(`http://192.168.1.2:8085/sellStock/${userName}`)
        console.log(userDetails)
        try {
            const response = await Axios.put(`http://192.168.1.2:8085/sellStock/${userName}`, userDetails)
            ToastAndroid.show(`${coinName} sold successfully`, ToastAndroid.LONG);
            console.log("Sold Response -> ", response.data)
        } catch (error) {
            console.log("Sell Error -> ", error.message)
            ToastAndroid.show(`Coin doesn't exist in portfolio`, ToastAndroid.CENTER)

        }
    }






    return (
        <View style={styles.container}>

            <View style={styles.coinNameContainer}>
                <Text style={styles.coinName}>{coinName}</Text>
            </View>

            <Image source={{ uri: route.params.full_object.coinImage }} style={styles.image} />


            <View style={styles.priceContainer}>
                <Text style={styles.price}> ₹ {full_object.full_object.current_price}</Text>
                <Text style={isHigh ? styles.high : styles.low}>{full_object.full_object.price_change_percentage_24h}%</Text>
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', borderColor: 'black', borderWidth: 1, width: 400 }}>

                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 18, color: 'white' }}>Quantity</Text>
                    <TextInput
                        placeholder="Enter a number"
                        keyboardType="decimal-pad"
                        value={quantity}
                        onChangeText={setQuantity_}
                        style={styles.input}
                    />
                </View>

                <View style={styles.resultContainer}>
                    <Text style={styles.result}> Cost  </Text>
                    <Text style={styles.totalCost}>₹{totalCost}</Text>
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => buyCoin()}
                >
                    <Text style={styles.buttonText}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sellButton}
                    onPress={() => { sellCoin() }}
                >
                    <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>
            </View>

            {/* <Text style={{ color: 'white', marginTop: 30 }}
                onPress={() => { navigation.navigate('Portfolio'); }}>
                Portfolio
            </Text> */}

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: 1000,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    coinNameContainer: {
        marginTop: 120
    },
    coinName: {
        fontSize: 20,
        fontStyle: 'bold',
        color: 'white',
        fontWeight: '500'

    },
    image: {
        height: 120,
        width: 120,
        marginTop: 30,
        borderColor: 'blue',
        borderRadius: 5
    },
    priceContainer: {
        marginTop: 25,

    },
    price: {
        color: 'white',
        fontSize: 40,
        color: 'white',
        fontWeight: '500'
    },
    inputContainer: {
        marginTop: 40,
        marginBottom: 40,
        display: 'flex',
        marginLeft: 80
    },
    high: {
        color: 'green',
        fontSize: 13,
        marginLeft: 30
    },
    low: {
        color: 'red',
        fontSize: 13,
        marginLeft: 30

    },
    input: {
        height: 40,
        width: 80,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
    },
    resultContainer: {
        marginTop: 40,
        display: 'flex',
        marginLeft: 80
    },
    result: {
        fontSize: 18,
        fontWeight: 600,
        color: 'white',
        marginTop: -5,
        marginBottom: 10,
    },
    totalCost: {
        alignSelf: 'center',
        fontSize: 35,
        fontWeight: 500,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 80,
        alignSelf: 'center'
    },
    buyButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        width: 150,
        margin: 20
    },
    sellButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        width: 150,
        margin: 20

    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
    },


});
