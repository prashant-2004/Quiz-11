import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ReferralScreen = () => {
  return (
    <View style={styles.container}>
      {/* Colored box taking up half of the page */}
      <View style={styles.coloredBox}>
        <Text style={styles.boxText}>Invite Friend and Earn</Text>
        <View style={styles.coinsContainer}>
          {/* Add your image here */}
          <Image
            source={require('../assets/tempcoin.png')} // Change this to the path of your image
            style={styles.coinImage}
          />
           <Text style={styles.coinsNumber}>100 </Text>
           <Text style={styles.coinsText}>Coins</Text>
        </View>
        <Text style={styles.coinsDescription}>100 Coins = 1 entry free in Quiz</Text>
      </View>

      {/* Text content */}
      <View style={styles.textContent}>
        <Text style={styles.title}>Refer and Earn</Text>
        <Text style={styles.description}>Invite friends and earn rewards!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  coloredBox: {
    flex: 1,
    backgroundColor: '#EF4E60', // Set the desired color for the box
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'baseline',
  },
  coinsNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  coinsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  coinImage: {
    width: 30, // Adjust this according to your image size
    height: 30, // Adjust this according to your image size
    marginLeft: 10, // Adjust the margin as needed
  },
  coinsDescription: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ReferralScreen;
