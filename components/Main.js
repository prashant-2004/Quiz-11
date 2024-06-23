import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'firebase/auth';

const Main = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    
    navigation.navigate('Login'); 
  };

  const handleAdminLoginPress = () => {
    console.log("ADMIN LOGIN");
    navigation.navigate('admin-dashboard'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Main/BackgroundHomePage.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>Login/Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonTextContainer}
        onPress={handleAdminLoginPress}
      >
        <Text style={styles.AdminText}>Admin Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonTextContainer: {
    position: 'absolute',
    bottom: 10, 
    paddingHorizontal: 15,
    marginStart: 250,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20, 
    color: '#fff',
  },
  AdminText: {
    fontSize: 12, 
    color: '#fff',
  },
});

export default Main;