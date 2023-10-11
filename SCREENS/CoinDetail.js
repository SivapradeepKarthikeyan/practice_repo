import React from 'react'
import { useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text, Button, StyleSheet, Alert, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from 'axios';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryAnimation } from 'victory-native';



export default function CoinDetail() {

    //states
    //COIN DATA
    const [coinData, setCoinData] = useState([]);

    //PERIOD
    const [period, setPeriod] = useState(15);

    //route
    //Receiving as JSON
    const route = useRoute();
    const { data } = route.params;
    const coinName = data.coinName;
    const full_object = route.params.data;

    //useEffect
    useEffect(() => {
        setCoinData([])
        getData()
    }, [period])

    //GETTING DATA FROM API
    function getData() {
        setCoinData([])
        const url = `https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}/market_chart?vs_currency=inr&days=${period}`;
        console.log(`Coin API url for ${period} days -> `, url)
        Axios.get(url).then(response => {
            const formatedData = response.data.prices.slice(0, period * 2).map(i => {
                return ({
                    x: i[0],
                    y: i[1]
                })
            });
            setCoinData(formatedData)

        });
    }


    //Navigating functions
    const navigation = useNavigation();

    function navigateNews() {

        const data_ =
        {
            coinName: coinName,
        }
        navigation.navigate('News', data_);
    }


    function navigateAction() {

        const data_ =
        {
            coinName: coinName,
            full_object: full_object
        }
        navigation.navigate('Action', data_);
    }


    function navigatePortfolio() {
        navigation.navigate('Portfolio');
    }

    return (
        <View style={styles.container}>


            <View style={styles.titleContainer}>
                <Text style={styles.coinName}>{data.coinId.toUpperCase()}</Text>
                <Image source={{ uri: data.coinImage }} style={styles.image} />
            </View>

            <Text style={styles.daysContainer}>CHART : {period} DAYS</Text>



            <View style={{ padding: 10 }}>
                <VictoryChart width={400} height={420}
                >
                    <VictoryAxis style={{ tickLabels: { display: 'none' } }} />
                    <VictoryAxis dependentAxis style={{ tickLabels: { display: 'none' } }} />
                    <VictoryLine data={coinData} interpolation="cardinal" style={{ data: { stroke: 'white', strokeWidth: 2 } }} />
                </VictoryChart>
            </View>





            <View style={styles.buttonContainer1}>
                <TouchableOpacity onPress={() => setPeriod(15)} style={styles.chartButtons}>
                    <Text>15 DAYS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(30)} style={styles.chartButtons}>
                    <Text>30 DAYS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(90)} style={styles.chartButtons}>
                    <Text>90 DAYS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(365)} style={styles.chartButtons}>
                    <Text>1 YEAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer2}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigateNews()}
                >
                    <Text style={styles.buttonText}>NEWS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigateAction()}
                >
                    <Text style={styles.buttonText}>ACTION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigatePortfolio()}
                >
                    <Text style={styles.buttonText}>PORTFOLIO</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        color: "black",
        height: '100%'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60
    },
    daysContainer: {
        color: "white",
        fontSize: 18,
        marginTop: 25
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 5,
        marginLeft: 20
    },
    coinName: {
        fontSize: 20,
        color: "white",
    },
    buttonContainer1: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        marginTop: 30,
    },
    buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 100,
        alignSelf: 'center'
    },
    chartButtons: {
        backgroundColor: 'skyblue',
        width: '20%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    button: {
        backgroundColor: '#F9F6EE',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 2
    },
    buttonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 500,
    },

})