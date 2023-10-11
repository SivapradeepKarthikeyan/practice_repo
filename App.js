import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import SplashScreen from "./SCREENS/SplashScreen";
import Login from './SCREENS/Login'
import SignIn from './SCREENS/SignIn'
import ScrollCoins from './SCREENS/ScrollCoins';
import CoinDetail from './SCREENS/CoinDetail';
import News from './SCREENS/News';
import Action from './SCREENS/Action';
import Portfolio from './SCREENS/Portfolio';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CardStyleInterpolators } from '@react-navigation/stack';


//Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MyStack() {
  return (

    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Home" component={ScrollCoins} options={{ headerShown: true }} />
      <Stack.Screen name="CoinDetail" component={CoinDetail} options={{ headerShown: false }} />
      <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
      <Stack.Screen name="Action" component={Action} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Portfolio" component={Portfolio} options={{ headerShown: false }} /> */}

    </Stack.Navigator>


  )
}




//Main
export default function App() {
  return (

    <NavigationContainer>

      {/* <Tab.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        <Tab.Screen name="Home" component={MyStack} options={{ headerShown: false }} />
        <Tab.Screen name="Portfolio" component={Portfolio} options={{ headerShown: false }} />
      </Tab.Navigator> */}


      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={ScrollCoins} options={{ headerShown: false }} />
        <Stack.Screen name="CoinDetail" component={CoinDetail} options={{ headerShown: false }} />
        <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
        <Stack.Screen name="Action" component={Action} options={{ headerShown: false }} />
        <Stack.Screen name="Portfolio" component={Portfolio} options={{ headerShown: false }} />

      </Stack.Navigator>

      {/* <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Tab.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={ScrollCoins} options={{ headerShown: false }} />
        <Tab.Screen name="CoinDetail" component={CoinDetail} options={{ headerShown: false }} />
        <Tab.Screen name="News" component={News}
          options={{ tabBarStyle: { display: 'none' } }}
        />
        <Tab.Screen name="Action" component={Action} options={{ headerShown: false }} />
        <Tab.Screen name="Portfolio" component={Portfolio} options={{ headerShown: false }} />
      </Tab.Navigator> */}


    </NavigationContainer>

  );
}


