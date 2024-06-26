//02-03-2024 = OriginalProfileScreen
// ProfileScreen.js
import React, { useState,useEffect,useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../Firebase-config.js';
import { AuthContext } from '../../routes/AuthProvider';
import { get, ref, set } from 'firebase/database';

const ProfileScreen = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    phoneNo: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  
  const handleProfileButtonClick = () => {
    console.log('Profile button clicked');
  };

  const walletButtonClick = (walletPage) => {
    console.log(`${walletPage} clicked`);
    navigation.navigate('Wallet');
  };
  const transactionButtonClick = () => {
    console.log(`transactionPage clicked`);
    navigation.navigate('TransactionScreen');
  }; 
  const referralButtonClick = (referralPage) => {
    console.log(`${referralPage} clicked`);
    navigation.navigate('Referral');
  }; 
  const helpButtonClick = (helpPage) => {
    console.log(`${helpPage} clicked`);
    navigation.navigate('Help');
  };
   const handleAboutUs = (aboutUsPage) => {
    console.log(`${aboutUsPage} clicked`);
    navigation.navigate('AboutUs');
  };
  const handleArrowButtonClick = () => {
    // Navigate to EditProfile screen
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out successfully');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  // State to store the user name
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Account',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  return (
    <>
    <View style={styles.container}>
      {/* User Details Profile Card */}
      <View style={styles.shadowBox}>
        <TouchableOpacity onPress={handleProfileButtonClick} style={styles.imageContainer}>
          <Image source={require('../../assets/User/Profile/profile.png')} style={styles.imageButtonIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {/* Display the username dynamically */}
          <Text style={styles.textAfterImage}>{userData.name}</Text>
          <Text style={styles.textBelowImage}>{userData.phoneNo}</Text>
          {/* Navigate to the new page on TouchableOpacity press */}
          <TouchableOpacity
            onPress={handleArrowButtonClick}
            style={styles.imageContainer}
          >
            <Icon name="arrow-right" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
    {/* Card for list in account page */}
      <View style={styles.shadowBox1}>
  <View style={styles.itemContainer}>
    <Image source={require('../../assets/User/Profile/wallet.png')} style={styles.shadowBox1Image} />
    <Text style={styles.textBesideImage}>Wallet</Text>
    <TouchableOpacity onPress={() => walletButtonClick('walletPage')}>
  <Image source={require('../../assets/User/Profile/arrowHead.png')} style={styles.shadowBox1ImageButton1} />
</TouchableOpacity>
  </View>
  <View style={styles.itemContainer}>
    <Image source={require('../../assets/User/Profile/Transaction.png')} style={styles.shadowBox1Image} />
    <Text style={styles.textBesideImage}>Transaction</Text>
    <TouchableOpacity onPress={() => transactionButtonClick()}>
          <Image source={require('../../assets/User/Profile/arrowHead.png')} style={styles.shadowBox1ImageButton2} />
        </TouchableOpacity>
  </View>
  <View style={styles.itemContainer}>
    <Image source={require('../../assets/User/Profile/earn.png')} style={styles.shadowBox1Image} />
    <Text style={styles.textBesideImage}>Referral</Text>
    <TouchableOpacity onPress={() => referralButtonClick('referralPage')}>
          <Image source={require('../../assets/User/Profile/arrowHead.png')} style={styles.shadowBox1ImageButton3} />
        </TouchableOpacity>
  </View>
  <View style={styles.itemContainer}>
    <Image source={require('../../assets/User/Profile/help.png')} style={styles.shadowBox1Image} />
    <Text style={styles.textBesideImage}>Help</Text>
    <TouchableOpacity onPress={() => helpButtonClick('helpPage')}>
          <Image source={require('../../assets/User/Profile/arrowHead.png')} style={styles.shadowBox1ImageButton4} />
        </TouchableOpacity>
  </View>
  <View style={styles.itemContainer}>
    <Image source={require('../../assets/User/Profile/AboutUs.png')} style={styles.shadowBox1Image} />
    <Text style={styles.textBesideImage}>About Us</Text>
    <TouchableOpacity onPress={() => handleAboutUs('aboutUsPage')}>
          <Image source={require('../../assets/User/Profile/arrowHead.png')} style={styles.shadowBox1ImageButton5} />
        </TouchableOpacity>
  </View>
</View>


      {/* Sign out button */}
      <View style={styles.content}>
      <TouchableOpacity onPress={() => handleLogout('Sign Out')}>
      <Text style={styles.signOutButton}>Sign Out</Text>
        </TouchableOpacity>
      </View> 
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#DCDFFF',
      },
    shadowBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 150, 
        width: 336,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        alignSelf: 'center',
        elevation: 5, // Android
        shadowColor: 'black', // iOS
        shadowOffset: { width: 0, height: 2 }, // iOS
        shadowOpacity: 0.3, // iOS
        shadowRadius: 3, // iOS
        position: 'relative', 
      },
      imageContainer: {
        paddingLeft: 10, 
      },
      imageButtonIcon: {
        width: 70,
        height: 70,
      },
      textContainer: {
        marginLeft: 10, 
      },
      textAfterImage: {
        color: 'black',
        fontSize: 30,
        marginTop: 15,
        fontWeight: 'bold',
      },
      arrowIcon:{
        flexDirection: 'column',
        //alignSelf: 'flex-end',
        marginLeft: 180,
        fontSize: 30,
      },
      textBelowImage: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10, 
      },
    
      shadowBox1: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 370,
        width: 336,
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 30,
        alignSelf: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        position: 'relative',
      },
      
      itemContainer: {
        marginLeft: 20,
        paddingTop: 15,
        //marginTop:5,
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20,  
      },
      
      textBesideImage: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },
     
      shadowBox1Image: {
        width: 25, 
        height: 30, 
        marginRight: 10,
      },
      shadowBox1ImageButton1:{
        width: 15,
        height: 15,
      alignItems: 'flex-end',
      marginLeft: 165,
      },
    
      shadowBox1ImageButton2:{
        width: 15,
        height: 15,
      alignItems: 'flex-end',
      marginLeft: 110,
      },
    
      shadowBox1ImageButton3:{
        width: 15,
        height: 15,
      alignItems: 'flex-end',
      marginLeft: 145,
      },
      shadowBox1ImageButton4:{
        width: 15,
        height: 15,
      alignItems: 'flex-end',
      marginLeft: 175,
      },
      shadowBox1ImageButton5:{
        width: 15,
        height: 15,
      alignItems: 'flex-end',
      marginLeft: 135,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        
      },
      signOutButton: {
        fontSize: 20,
      },
});

export default ProfileScreen;
