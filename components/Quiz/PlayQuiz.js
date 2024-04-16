import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

function PlayQuiz({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Add a box with a specific height and width */}
      <View style={styles.box}>
        {/* Container for left image and text */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/MI.png')} style={styles.image} />
          <Text style={styles.imageText}>MI</Text>
          
        </View>
        {/* Center text */}
        <Text style={styles.centerText}>VS</Text>
        {/* Container for right image and text */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/CSK.png')} style={styles.image} />
          <Text style={styles.imageText}>CSK</Text>
          
        </View>
      </View>
      {/* Texts positioned in a row */}
      <View style={styles.line}>
        <Text style={styles.lineText}>question 1 of 11</Text>
        <Image source={require('../assets/CSK.png')} style={styles.image} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How is the Title Sponsor of the IPL 2024 ?</Text>
        {/* Add four boxes vertically */}
        <View style={styles.answerBox}>
          <Text>Answer 1</Text>
        </View>
        <View style={styles.answerBox}>
          <Text>Answer 2</Text>
        </View>
      </View>
      {/* Additional box at the end of the screen */}
      <View style={styles.additionalBox}>
        <Text>Next</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0ECE5',
  },
  box: {
    width: 300,
    height: 70,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row', // Arrange children horizontally
  },
  line: {
    marginTop: 50,
    justifyContent: 'space-between',
    flexDirection: 'row', // Arrange children horizontally
    width: 320, // Set a fixed width to the row
  },
  lineText: {
    //marginTop: 40,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 20, // Add margin between image containers
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 5, // Add margin between image and text
  },
  imageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageSubText: {
    fontSize: 10,
    color: 'gray',
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    alignItems: 'center',
    //marginTop: 10, // Add top margin
  },
  questionText: {
    fontSize: 30, // Adjust the font size
    fontWeight: 'bold', // Set the font weight
   // marginTop: 10, // Add top margin
    color: 'black', // Set the text color
  },
  answerBox: {
    width: 250, // Set width of the box
    height: 50, // Set height of the box
    backgroundColor: 'white', // Set background color
    borderRadius: 10, // Add border radius
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    marginTop: 25, // Add top margin
  },
  additionalBox: {
    width: 250,
    height: 50,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default PlayQuiz;
