import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Axios from 'axios';


const SignupScreen = () => {

    //Data
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    //Navigation
    const navigation = useNavigation();


    const handleSignup = async () => {
        console.log('Username:', userName);
        console.log('Password:', password);

        //Store in local storage
        await SecureStore.setItemAsync('userName', userName);

        //User Object
        const userDetails = {
            "userName": userName,
            "userPassword": password,
            "userBalance": 10000,
            "userStocksList": [],
            "userWatchList": []
        }
        console.log("User details -> ", userDetails)

        //Create user in DB
        try {

            const response = await Axios.post(`http://192.168.1.2:8085/createUser`, userDetails);
            console.log("Sign In Response -> ", response.data)

        } catch (error) {
            console.log("Sign In Error -> ", error)
        }



        navigation.navigate('Home');


    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUserName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // White background
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black', // Black text color
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black', // Black border color
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'black', // Black button background
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
