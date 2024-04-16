import {React, useState} from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image, TextInput, Platform } from 'react-native';
import styles from './Login_Style';

function Login_Page({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  
  // AFTER DARK-MODE BUTTON CLICKED..-->>
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // AFTER LOGIN BUTTON CLICKED..-->>
  const handleLogin = () => {
    console.log('Login button pressed');
    navigation.navigate('Home');
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

      {/* Username Field */}
      <TextInput
        style={[styles.input, { backgroundColor: !darkMode ? '#333' : '#eee', color: darkMode ? '#000' : '#fff' }]}
        placeholder="Username"
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

      </View>

    </KeyboardAvoidingView>
  );
}

export default Login_Page;