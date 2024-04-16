import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';

function QuizHomePageScreen({ navigation }) {
  // Sample data for the boxes
  const data = Array.from({ length: 10 }, (_, index) => ({ id: index, title: `Quiz ${index + 1}` }));

  // Function to handle button press
  const handleBoxPress = (boxId) => {
    // You can navigate to another screen or perform any action here
    console.log(`Box ${boxId + 1} pressed`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
   
      {/* Mapping over the data to create box buttons */}
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.box}
          onPress={() => handleBoxPress(item.id)}
        >
          <Text style={styles.boxText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#DCDFFF',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next line
   
  },
  box: {
    width: '45%', // 45% width to fit two boxes in a row with some margin
    marginStart: 10,
    height: 40,
    aspectRatio: 1, // Maintain square aspect ratio
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizHomePageScreen;
