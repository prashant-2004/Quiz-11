import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutUsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Us</Text>
      <Text style={styles.detailsText}> Quiz11 offers quizzes targeted towards different age groups, ensuring there are options for everyone. {'\n'}
        Knowledge-based Quizzes   
Quiz11 offers a wide range of quizzes that solely depend on your knowledge, giving everyone an equal chance to win.
Encourages Learning
Quiz11 motivates students to study and increase their knowledge through engaging and educational quizzes.
Compete with Others
Challenge your friends or compete with other students, making the learning experience more interactive and enjoyable.
Track Your Progress
Stay updated on your performance and track your progress as you participate in quizzes on Quiz11.
Exciting Prizes
Winning quizzes on Quiz11 not only boosts your knowledge but also rewards you with exciting prizes.</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align to the top of the screen
    alignItems: 'center',
    padding: 20, // Optional: Add padding for better visibility
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'blue',
  },
  detailsText:{
    marginTop: 20,
    fontSize: 18,
    //fontWeight: 'bold',
    padding: 1,
    
   
  },
});

export default AboutUsScreen;
