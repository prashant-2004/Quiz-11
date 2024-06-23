// Import necessary libraries
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { database } from '../../Firebase-config.js'; // Adjust the import path to your Firebase config
import { ref, push } from 'firebase/database';

const Dashboard = () => {
  const [queNo, setQueNo] = useState(null);
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = () => {
    if (!queNo || !question || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!['1', '2', '3', '4'].includes(correctOption)) {
      Alert.alert('Error', 'Correct option must be a number between 1 and 4.');
      return;
    }

    const quizData = {
      queNo,
      question,
      options: [option1, option2, option3, option4],
      correctOption: parseInt(correctOption) - 1, // Adjust for zero-based index
    };

    const quizRef = ref(database, 'quiz/questions');
    push(quizRef, quizData)
      .then(() => {
        Alert.alert('Success', 'Quiz question added successfully.');
        // Clear the form
        setQueNo(null);
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('');
      })
      .catch((error) => {
        console.error('Error adding quiz question:', error);
        Alert.alert('Error', 'Could not add quiz question.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Question No."
        value={queNo}
        input='number'
        onChangeText={setQueNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Option 1"
        value={option1}
        onChangeText={setOption1}
      />
      <TextInput
        style={styles.input}
        placeholder="Option 2"
        value={option2}
        onChangeText={setOption2}
      />
      <TextInput
        style={styles.input}
        placeholder="Option 3"
        value={option3}
        onChangeText={setOption3}
      />
      <TextInput
        style={styles.input}
        placeholder="Option 4"
        value={option4}
        onChangeText={setOption4}
      />
      <TextInput
        style={styles.input}
        placeholder="Correct Option (1-4)"
        value={correctOption}
        onChangeText={setCorrectOption}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Dashboard;
