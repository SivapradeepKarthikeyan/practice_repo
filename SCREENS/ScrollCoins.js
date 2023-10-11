import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, RefreshControl, AsyncStorage, Image } from "react-native";
import Axios from 'axios';
import ScrollCoinsTemplate from './ScrollCoinsTemplate';
import * as SecureStore from 'expo-secure-store';


export default function ScrollCoins({ navigation }) {
    //States
    //CoinsArray
    const [coinsArray, setCoinsArray] = useState([]);
    //Refresh
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //useEffect
    useEffect(() => {
        fetchData()
    }, [])


    //Refresh
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            fetchData();
            setRefreshing(false);
        }, 2000);
    };

    //Data fetch from API
    const fetchData = async () => {
        await Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((response) => { setCoinsArray(response.data); setIsLoading(false) })
            .catch((err) => { console.log(err.message); setIsLoading(false) })
    }



    return (
        <View style={{ height: '100%', backgroundColor: 'black' }}>
            {isLoading ?
                (<>
                    {/* <ActivityIndicator size="large" color="blue" style={{ marginTop: 500 }} /> */}
                    <Image source={{ uri: `https://i.gifer.com/7SUP.gif` }}
                        style={{ height: 100, width: 100, marginTop: 400, alignSelf: 'center' }} />
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Loading </Text>

                </>
                )
                :
                (
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView
                            style={{ backgroundColor: "black" }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        >
                            {
                                coinsArray.map(i => {
                                    return (
                                        <ScrollCoinsTemplate
                                            full_object={i}
                                            key={i.id}
                                            name={i.name}
                                            id={i.id}
                                            image={i.image}
                                            symbol={i.symbol}
                                            current_price={i.current_price}
                                            price_change_percentage_24h={i.price_change_percentage_24h}

                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>


    )
}

const styles = StyleSheet.create(
    {
        title: {
            fontSize: 25,
            fontWeight: '800',
            color: 'white',
            margin: 5,
            marginBottom: 10
        }
    }
)