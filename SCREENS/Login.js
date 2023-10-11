import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Axios from 'axios';

const LoginScreen = () => {

    //Data
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    //Navigation
    const navigation = useNavigation();

    const handleLogin = async () => {
        console.log('User Name:', userName);
        console.log('Password:', password);


        //Get user from DB
        try {
            const response = await Axios.get(`http://192.168.1.2:8085/portfolio/${userName}`)
            console.log("Login In Response -> ", response.data)

            if (response.data.success) {
                //Store in local storage
                await SecureStore.setItemAsync('userName', userName);

                //navigate
                navigation.navigate('Home');
            }
            else {
                console.log("--wrong credentialds--")
            }


        } catch (error) {
            console.log("Login error -> ", error.message)
            console.log("--wrong credentialds--")


        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                //placeholder="Username"
                onChangeText={(text) => setUserName(text)}
            />
            <TextInput
                style={styles.input}
                //placeholder="Password"
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
                <Text style={{ color: 'white' }}>Didnt't have an account?
                    <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate('SignIn'); }}>SignUp</Text></Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'white',
    },
    button: {
        backgroundColor: '#ffffff',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
