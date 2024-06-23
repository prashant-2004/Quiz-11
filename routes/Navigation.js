// Navigation.js
import React from 'react';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login_Page from '../components/User/Login_Page';
import Register_Page from '../components/User/Register_Page';
import SplashScreen from '../components/SplashScreen';
import Main from '../components/Main';
import HomeScreen from '../components/Home/HomeScreen';
import EditProfile from '../components/Profile/EditProfile';
import HelpScreen from '../components/Profile/HelpScreen';
import Referral from '../components/Profile/ReferralScreen';
import TransactionScreen from '../components/Profile/TransactionScreen';
import AboutUsScreen from './../components/Profile/AboutUsScreen';
import SettingsScreen from './../components/temp/SettingsScreen';
import JoinQuiz from '../components/Quiz/JoinQuiz';
import PlayQuiz from '../components/Quiz/PlayQuiz';
import Dashboard from './../components/admin/Dashboard';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../Firebase-config.js';
import { AuthProvider } from './AuthProvider';

const Stack = createStackNavigator();

const Navigation = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       // User is signed in
  //       setUser(currentUser);
  //     } else {
  //       // User is signed out
  //       setUser(null);
  //     }
  //   });
  //     // Cleanup subscription on unmount
  //     return () => unsubscribe();
  //   }, []);


  return (
    <AuthProvider>
    <NavigationContainer initialRouteName="Splash">
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Referral" component={Referral} options={{ headerShown: false }}/>
        <Stack.Screen name="TransactionScreen" component={TransactionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="JoinQuiz" component={JoinQuiz} options={{headerShown: false}}/>    
        <Stack.Screen name="PlayQuiz" component={PlayQuiz} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component={Login_Page} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register_Page} options={{ headerShown: false }}/>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="admin-dashboard" component={Dashboard} options={{ headerShown: false }}/>
                
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    // <NavigationContainer initialRouteName="Splash">
    //   <Stack.Navigator initialRouteName="Splash">
    //     {user && (
    //       <>
    //         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
    //         <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }}/>
    //         <Stack.Screen name="Referral" component={Referral} options={{ headerShown: false }}/>
    //         <Stack.Screen name="TransactionScreen" component={TransactionScreen} options={{ headerShown: false }}/>
    //         <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }}/>
    //         <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
    //         <Stack.Screen name="JoinQuiz" component={JoinQuiz} options={{headerShown: false}}/>    
    //         {/* <Stack.Screen name="PlayQuiz" component={PlayQuiz} options={{headerShown: false}}/> */}
    //       </>
    //     )} 
    //     <Stack.Screen name="Login" component={Login_Page} options={{ headerShown: false }}/>
    //     <Stack.Screen name="Register" component={Register_Page} options={{ headerShown: false }}/>
    //     <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
            
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;