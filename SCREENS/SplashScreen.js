import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Image source={require('./ssImg.jpg')} style={{ height: 1200, width: 500, borderColor: 'red', borderWidth: 2 }} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 20,
        fontStyle: 'normal'
    }

})