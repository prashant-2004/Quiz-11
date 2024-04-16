import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WalletScreen = ({ navigation }) => {
  const handleButtonPress = (buttonNumber) => {
    // Handle the press event for the buttons
    console.log(`Button ${buttonNumber} Pressed`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperBox}>
        <Text style={styles.headerText}>Account Balance</Text>
        <Text style={styles.boxText}>₹500.00</Text>
      </View>

      {/* Row of Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(1)}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(2)}>
          <Text style={styles.buttonText}>Withdraw Money</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  upperBox: {
    width: 300,
    height: 110,
    backgroundColor: '#3498db',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  headerText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen;
