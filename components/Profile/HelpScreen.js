// HelpScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
const HelpScreen = () => {
  const initialVisibleItems = 2; // Initial number of visible FAQ items
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [showContactUsText, setShowContactUsText] = useState(false); // New state


  const faqData = [
    {
      id: 1,
      question: 'Is Quiz11 a gambling platform?',
      answer: 'No, Quiz11 is a game of knowledge and does not involve any form of gambling.',
    },
    {
      id: 2,
      question: 'Can I reset my password?',
      answer: 'Yes, you can reset your password by clicking on the "Forgot Password" link on the login page.',
    },
    {
      id: 3,
      question: 'What kind of prizes can I win?',
      answer: 'Quiz11 offers a variety of exciting prizes, including cash rewards, gift cards, and electronics.',
    },
    {
      id: 4,
      question: 'How can I participate in quizzes on Quiz11?',
      answer: 'Simply create an account on Quiz11 and start participating in the available quizzes.',
    },
    {
      id: 5,
      question: 'Are the quizzes suitable for all age groups?',
      answer: 'Quiz11 offers quizzes targeted towards different age groups, ensuring there are options for everyone.',
    },
    {
      id: 6,
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption to ensure the security of your payment details.',
    },
    {
      id: 7,
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption to ensure the security of your payment details.',
    },
    
    
    // Add more FAQ items as needed
  ];

  const toggleVisibility = () => {
    setShowAllQuestions(!showAllQuestions);
    if (!showAllQuestions) {
      setVisibleItems(faqData.length);
    } else {
      setVisibleItems(initialVisibleItems);
    }
  };
  const handleContactUsClick = () => {
    // Toggle the state to show/hide additional text
    setShowContactUsText(!showContactUsText);
  };

  return (
    <ScrollView style={styles.container}>
             {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.faqHeading}>Frequently Asked Questions</Text>

        {faqData.slice(0, visibleItems).map((faqItem) => (
          <View key={faqItem.id} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faqItem.question}</Text>
            <Text style={styles.faqAnswer}>{faqItem.answer}</Text>
          </View>
        ))}

        {faqData.length > initialVisibleItems && (
          <TouchableOpacity onPress={toggleVisibility}>
            <Text style={styles.viewMoreButton}>{showAllQuestions ? 'View Less' : 'View More'}</Text>
          </TouchableOpacity>
        )}
      </View>
       {/* Shadow Box after FAQ Section */}
       <View style={styles.shadowBox}>
        {/* Column layout for "Need further assistance?" and "Contact Us" */}
        <View style={styles.columnLayout}>
          {/* Text on the left */}
          <View style={styles.textContainer}>
            <Text style={styles.assistanceText}>Need further assistance?</Text>
            <TouchableOpacity onPress={handleContactUsClick}>
              <Text style={styles.assistanceButton}>Contact Us</Text>
            </TouchableOpacity>
          </View>
          
          {/* Image in the center */}
          <Image source={require('./Help1.jpg')} style={styles.assistanceImage} />
        </View>
        {/* Additional text below "Contact Us" button */}
        {showContactUsText && (
          <Text style={styles.additionalText}>
            quiz11support@gmail.com
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  faqSection: {
    marginBottom: 20,
  },
  faqHeading: {
    fontSize: 20,
    marginStart: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 15,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#555',
  },
  viewMoreButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
    alignSelf: 'flex-end',
   marginEnd: 15,
    textDecorationLine: 'underline',
  },
  
  
  faqItem: {
    marginBottom: 10,
    backgroundColor: 'white', // Set the background color if not already set
    borderRadius: 20, // Set border radius for rounded corners
    marginStart: 10,
    marginEnd: 10,
    padding: 15, // Add padding for content
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },

  assistanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginStart: 20,
  },
  assistanceButton: {
    fontSize: 16,
    color: 'blue',
    marginStart: 20,
    textDecorationLine: 'underline',
  },
  assistanceImage: {
    width: 140,
    height: 80,
    resizeMode: 'contain', // Adjust the image resizing mode as needed
  },

  columnLayout: {
    flexDirection: 'row',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  textContainer: {
    marginBottom: 20, // Add margin to separate text and image
  },

  shadowBox: {
    backgroundColor: 'white', // Set the background color if not already set
    borderRadius: 20, // Set border radius for rounded corners
    marginStart: 10,
    marginEnd: 10,
    padding: 5, // Add padding for content
    marginBottom: 20,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  additionalText: {
    fontSize: 16,
    marginTop: -15,
    //marginLeft: 20,
    //marginRight: 20,
  },


});

export default HelpScreen;