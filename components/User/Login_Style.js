import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Background color similar to Netflix
      padding: 16,
    },
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

    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
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
    
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 15,
    },
  
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
  
    loginButton: {
      backgroundColor: '#3498db',
      width: '48%',
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      marginRight:5,
      marginHorizontal:8,
    },
    
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    registerButton: {
      backgroundColor: '#e67e22',
      width: '48%',
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      marginRight:5,
      marginHorizontal:8,
    },
    
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    
    eyeIcon: {
      position: 'absolute',
      right: 20,
      marginRight:10,
      transform: [{ translateY: 45 }], // Adjust the vertical position as needed
    },
    
    eyeIconImage: {
      width: 25,
      height: 25,
    },
    
  });