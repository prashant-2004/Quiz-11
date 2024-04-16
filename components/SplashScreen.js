import React, { useEffect } from 'react';
import { View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { flipOutX } from './../node_modules/react-native-animatable/definitions/flippers';
import { swing, rotate } from './../node_modules/react-native-animatable/definitions/attention-seekers';
import { lightSpeedIn } from './../node_modules/react-native-animatable/definitions/lightspeed';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Perform any initialization or asynchronous tasks here
    // After the tasks are done, navigate to the next screen
    setTimeout(() => {
      navigation.replace('Login'); // Replace 'Home' with your actual home screen name
    }, 3000); // Adjust the timeout based on your animation duration
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.Image
        animation="rotate" // You can choose any animation type from the library
        duration={3000} // Adjust the duration based on your animation duration
        source={require('../assets/App_Logo/quiz11_icon.png')} // Replace with the actual path
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default SplashScreen;