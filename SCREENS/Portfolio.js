import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const PortfolioScreen = () => {
    //Variables
    const [userName, setUserName] = ('');
    const [userStockList, setUserStockList] = useState([]);
    const [userDetails, setUserDetails] = useState({})

    //useEffect
    useEffect(() => {
        //Get Username
        async function getUserName() {
            try {
                const username = await SecureStore.getItemAsync('userName');
                if (username) {
                    console.log('Username Retrived  (Portfolio ) ->', username);
                    getUserPortfolio(username) //->Called here
                }
            } catch (error) {
                console.error('Error retrieving username:', error);
            }
        }
        getUserName()
        //Get Portfolio
        async function getUserPortfolio(username) {
            try {
                console.log(`http://192.168.1.2:8085/portfolio/${userName}`)
                const response = await Axios.get(`http://192.168.1.2:8085/portfolio/${username}`);
                console.log(`PORTFOLIO  OF ${userName}-> `, response.data.data);
                setUserDetails(response.data.data)
                setUserStockList(response.data.data.userStocksList)
            } catch (error) {
                console.log(error.message)
            }
        }


    }, [])


    return (
        <View style={styles.container}>

            <Text style={styles.title}>MY Portfolio</Text>
            <Text style={styles.userDetails}>Name - {userDetails.userName}</Text>
            <Text style={styles.userDetails}>Balance - {userDetails.userBalance}</Text>

            <FlatList
                data={userStockList}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 50 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.companyName}>{item.stockName}</Text>
                        <Text style={styles.shares}>Shares: {item.stockQuantity}</Text>
                        <Text style={styles.currentPrice}>Current Price: ₹ {item.stockPrice}</Text>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white',
        marginTop: 20
    },
    userDetails: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
        color: 'white',
        marginTop: 5
    },
    card: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        // borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white'

    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    symbol: {
        fontSize: 16,
        color: '#666',
    },
    shares: {
        fontSize: 16,
        marginTop: 8,
        color: 'white'
    },
    currentPrice: {
        fontSize: 16,
        marginTop: 8,
        color: 'green',
    },
});

export default PortfolioScreen;
