// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login_Page from '../components/User/Login_Page';
import Register_Page from '../components/User/Register_Page';
import SplashScreen from '../components/SplashScreen';
import HomeScreen from '../components/Home/HomeScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer initialRouteName="Splash">
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login_Page} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register_Page} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;