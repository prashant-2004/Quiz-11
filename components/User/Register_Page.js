import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const Register_Page = ({navigation}) => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // AFTER DARK-MODE BUTTON CLICKED..-->>
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log('Registration Details:', { Name, email, password, confirmPassword });
    // You can send the registration details to your server or perform any other necessary actions.
  };

  const handleLoginLink =()=>{
    navigation.navigate('Login');
  };
  
  return (
    <ImageBackground
      source={{ uri: 'https://your-background-image-url.com' }} // Provide a background image URL
        style={[styles.background, { backgroundColor: !darkMode ? '#fff' : '#000' }]}
    >
      <View style={styles.container}>

        {/* Dark Mode Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleDarkMode}
        >
          <Image
            source={!darkMode ? require('../../assets/Dark_mode/moon-icon.png') : require('../../assets/Dark_mode/sun-icon.png')}
            style={styles.toggleIcon} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/App_Logo/quiz11_icon.png')} // Specify the local path of your logo
          style={styles.logo}
        />
        <Text style={[styles.title,{color: !darkMode ? '#000' : '#fff' }]}>Join Quiz11</Text>
        
        {/* Name Field */}
        <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="Name"
        placeholderTextColor="#bbb"
        onChangeText={(text) => setName(text)}
        value={Name} />

        {/* Email Field */}
        <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="Mobile No."
        placeholderTextColor="#bbb" 
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="number-pad" 
        />
        
        {/* Password Field */}
        <View style={styles.inputContainer}>
        <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="Password"
        placeholderTextColor="#bbb" 
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={!showPassword}
        />

        <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={[styles.showPasswordButtonText,{color: !darkMode ? '#fff' : '#000'}]}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
      </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="confirm Password"
        placeholderTextColor="#bbb" 
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={!showConfirmPassword}
        />

      <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={[styles.showPasswordButtonText,{color: !darkMode ? '#fff' : '#000'}]}>
              {showConfirmPassword ? 'Hide Password' : 'Show Password'}
            </Text>
      </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={[styles.loginText,{color: !darkMode ? '#000' : '#fff' }]}>Already have an account?</Text>
      
        <TouchableOpacity onPress={handleLoginLink}>
          <Text style={[styles.loginText,{ paddingTop:0, textDecorationLine: 'underline', color: 'blue' }]}>
          Log in
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  
  toggleButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    marginTop:20,
    margin:'auto',
    marginHorizontal:130,
    alignItems:"center",
    transform: [{ translateY: 200 }],
    transform:[{translateX:0}]
  },
  toggleIcon: {
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    // backgroundColor: '#f4f4f4', // WHITE Background color
    backgroundColor: '#444', // Input field background color
    color: '#fff', // Text color
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: 15,

    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'black',
    paddingTop: 12,
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 1,
  },
  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 8,
    top: 18,
  },
  showPasswordButtonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default Register_Page;