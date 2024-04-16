import React from 'react';
import { View, Button } from 'react-native';

function JoinQuiz({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Play Quiz"
        onPress={() => navigation.navigate('PlayQuiz')} // Replace 'AnotherPage' with the name of the page you want to navigate to
      />
    </View>
  );
}

export default JoinQuiz;
