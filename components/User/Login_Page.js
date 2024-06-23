import {React, useState} from 'react';
import { View, Text, ToastAndroid, TouchableOpacity, KeyboardAvoidingView, Image, TextInput, Platform } from 'react-native';
import { auth, database } from '../../Firebase-config.js';
import {ref, get} from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomToast from '../CustomToast';
import styles from './Login_Style';

function Login_Page({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  // AFTER DARK-MODE BUTTON CLICKED..-->>
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // AFTER LOGIN BUTTON CLICKED..-->>
  const handleLogin = () => {
    console.log('Login button pressed');

    // Check if email and password are not empty
    if (!email.trim() && !password.trim()) {
      // Show toast message for empty fields
      // ToastAndroid.show('Please enter both email and password', ToastAndroid.SHORT);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
      setMessage("Please enter both email and password");
      return;
    }
    else if(!email.trim())
    {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
      setMessage("Please enter email");
      // ToastAndroid.show('Please enter email', ToastAndroid.SHORT);
    }
    else if(!password.trim())
    {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
      setMessage("Please enter Password");
      // ToastAndroid.show('Please enter Password', ToastAndroid.SHORT);
    }
    else
    {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userRef = ref(database, 'users/' + userCredential.user.uid);
          get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("User Data: ", userData);
                navigation.navigate('Home');
                
              } else {
                console.log("FIRST CREATE NEW ACCOUNT");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1000);
                setMessage("No account found. Please register.");
                // ToastAndroid.show('No account found. Please register.', ToastAndroid.LONG);
              }
            })
            .catch((error) => {
              console.error("Failed to read database:", error);
            });
        })
        .catch((error) => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 1000);
          setMessage("INVALID CREDENTIALS");
          // ToastAndroid.show('INVALID CREDENTIALS', ToastAndroid.SHORT);
        });
    }
  };

  // AFTER REGISTER BUTTON CLICKED..-->>
  const handleRegister = () => {
    // Add your register logic here
    console.log('Register button pressed');
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.loginContainer, { backgroundColor: !darkMode ? '#fff' : '#000' }]}>

      {/* Dark Mode Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={toggleDarkMode}
      >
        <Image
          source={!darkMode ? require('../../assets/Dark_mode/moon-icon.png') : require('../../assets/Dark_mode/sun-icon.png')}
          style={styles.toggleIcon} />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/App_Logo/quiz11_icon.png')}
        style={styles.logo} />

      {/* E-mail ID Field */}
      <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="E-mail ID"
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#bbb" />

      {/* Password Field */}
      <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="Password"
        placeholderTextColor="#bbb"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={!showPassword} />

      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Image
          source={showPassword ? require('../../assets/User/eye-open-icon.png') : require('../../assets/User/eye-closed-icon.png')}
          style={styles.eyeIconImage} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.registerButton]}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

          <CustomToast message={message} isVisible={showToast} duration={1000} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login_Page;