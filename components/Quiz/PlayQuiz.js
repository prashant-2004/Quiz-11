import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { database, auth } from '../../Firebase-config.js'; // Adjust the import path to your Firebase config
import { ref, get, update, query } from 'firebase/database';

function PlayQuiz({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(15); // Initial timer value
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const user = auth.currentUser; // Ensure the user is logged in
  if (!user) {
    navigation.navigate('Login'); // Redirect to login if not authenticated
  }

  // Fetch quiz data from Firebase
  const fetchQuizData = async () => {
    const quizRef = ref(database, 'quiz/questions');
    const quizQuery = query(quizRef);
    const snapshot = await get(quizQuery);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const questionsArray = Object.keys(data).map((key) => data[key]);
      // Sort questions by queNo in ascending order
      const sortedQuestions = questionsArray.sort((a, b) => Number(a.queNo) - Number(b.queNo));
      setQuestions([...sortedQuestions]);
    } else {
      console.log('No quiz data available');
    }
  };

  useEffect(() => {
    fetchQuizData(); // Fetch data for the first question
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleButtonPress = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const question = questions.find(question => question.queNo === `${currentQuestionIndex + 1}`);
      if (selectedOption === question?.correctOption) {
        setScore((prevScore) => {
          const updatedScore = prevScore + 1;
          // Check if it is the last question
          if (currentQuestionIndex === questions.length - 1) {
            submitScore(updatedScore); // Submit the updated score
          }
          return updatedScore;
        });
      } else {
        if (currentQuestionIndex === questions.length - 1) {
          submitScore(score); // Submit the current score
        }
      }
      setSelectedOption(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimer(15); // Reset timer for the next question
      }
    } else {
      if (timer === 0) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimer(15);
      } else {
        ToastAndroid.showWithGravity('Please select an option before proceeding',
          ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }
    }
  };

  const handleQuizSubmit = async () => {
    submitScore(score);
  };

  const submitScore = async (score) => {
    const userRef = ref(database, `users/${user.uid}/quizResults`);
    await update(userRef, {
      score: score,
      timestamp: Date.now(),
    });
    Alert.alert('Success', 'Your Quiz has been submitted successfully..!! \n           THANK YOU.');
    navigation.navigate('Home');
  };

  const windowWidth = Dimensions.get('window').width;
  const circleRadius = 20;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = (1 - timer / 15) * circumference;

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/Home/MI.png')} style={styles.image} />
          <Text style={styles.imageText}>MI</Text>
        </View>
        <Text style={styles.centerText}>VS</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/Home/CSK.png')} style={styles.image} />
          <Text style={styles.imageText}>CSK</Text>
        </View>
      </View>
      <View style={styles.line}>
        <Text style={styles.lineText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <View style={styles.timerContainer}>
          <Svg width={2 * circleRadius} height={2 * circleRadius}>
            <Circle
              cx={circleRadius}
              cy={circleRadius}
              r={circleRadius - strokeWidth / 2}
              stroke="#000000"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Circle
              cx={circleRadius}
              cy={circleRadius}
              r={circleRadius - strokeWidth / 2}
              stroke="#FF0000"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              fill="transparent"
            />
            <SvgText
              x={circleRadius}
              y={circleRadius}
              fontSize="20"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#000"
            >
              {timer}
            </SvgText>
          </Svg>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerBox,
              selectedOption === index && { backgroundColor: 'lightgreen' },
            ]}
            onPress={() => handleButtonPress(index)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity style={styles.additionalBox2} onPress={handleNext}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>SUBMIT</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.additionalBox} onPress={handleNext}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>NEXT</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0ECE5',
  },
  box: {
    width: windowWidth * 0.9,
    height: 70,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    marginTop: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: windowWidth * 0.9,
  },
  lineText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  imageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  answerBox: {
    width: windowWidth * 0.7,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'flex-end',
    width: windowWidth * 0.5,
  },
  additionalBox: {
    flex: 1,
    height: 50,
    fontSize: 30,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  additionalBox2: {
    flex: 1,
    height: 50,
    fontSize: 30,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    color: 'white',
  },
});

export default PlayQuiz;




// ------------------------------------------------------------------------
// MY CODE BEFORE FINAL.
// ------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { View, Text, ToastAndroid, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
// import { Svg, Circle, Text as SvgText } from 'react-native-svg';
// import { database, auth } from '../../Firebase-config.js'; // Adjust the import path to your Firebase config
// import { ref, get, update, query} from 'firebase/database';
// import Toast from 'react-native-toast-message';


// function PlayQuiz({ navigation }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [timer, setTimer] = useState(15); // Initial timer value
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [score, setScore] = useState(0);

//   const user = auth.currentUser; // Ensure the user is logged in
//   if (!user) {
//     navigation.navigate('Login'); // Redirect to login if not authenticated
//   }

//   // Fetch quiz data from Firebase
//   const fetchQuizData = async () => {
//     const quizRef = ref(database, 'quiz/questions');
//     const quizQuery = query(quizRef);
//     console.log("QUERY - ",quizQuery);
//     const snapshot = await get(quizQuery);
//     console.log("SNAPSHOT - ,",snapshot);
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log("DATA :",data);
//       const questionsArray = Object.keys(data).map((key) => data[key]);
//       // Sort questions by queNo in ascending order
//     const sortedQuestions = questionsArray.sort((a, b) => Number(a.queNo) - Number(b.queNo));
//     setQuestions([...sortedQuestions]);
//       setQuestions(questionsArray);
//     } else {
//       console.log('No quiz data available');
//     }
//   };

//   useEffect(() => {
//     fetchQuizData(); // Fetch data for the first question
//   }, []);

//   useEffect(() => {
//     if (timer === 0) {
//       // if(currentQuestionIndex == questions.length - 1)
//         // handleQuizSubmit();
//       // else
//       handleNext();
//     }

//     const interval = setInterval(() => {
//       setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleButtonPress = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };
  
//   const handleNext = () => {
//     if (selectedOption !== null) {
//       const question = questions.find(question => question.queNo === `${currentQuestionIndex+1}`);
//       console.log("QUESTION ; ",question);
//       console.log("CORRECT _______->",question?.correctOption);
//       if (selectedOption === question?.correctOption) {
//         setScore((prevScore) => prevScore + 1);
//       }

      
//       setSelectedOption(null);
      
//       if(currentQuestionIndex === questions.length - 1)
//       {
//         handleQuizSubmit();
//       }
//       else
//       {
//         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//         setTimer(15); // Reset timer for the next question
//       } 
//     } else if(selectedOption == null){
//       if(timer === 0)
//       {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       setTimer(15);
//       }
//       else
//       {
//         ToastAndroid.showWithGravity('Please select an option before proceeding',
//         ToastAndroid.SHORT,ToastAndroid.BOTTOM);
//       }
//     }
//   };
//   console.log("SCORE _____>", score);


//   const handleQuizSubmit = async () => {
//     // if (selectedOption !== '')
//     // {
//     //   const question = questions.find(question => question.queNo === `${currentQuestionIndex+1}`);
//     //   console.log("QUESTION ; ",question);
//     //   console.log("CORRECT _______->",question?.correctOption);
//     //   if (selectedOption === question?.correctOption) {
//     //     setScore((prevScore) => prevScore + 1);
//     //   }
//     //   setSelectedOption('');
//     // }
//     submitScore(score);
//   };

//   const submitScore = async (score) =>{
//     console.log("SCORE : ",score);
//     const userRef = ref(database, `users/${user.uid}/quizResults`);
//     await update(userRef, {
//       score: score,
//       timestamp: Date.now(),
//     });
//     Alert.alert('Success', 'Your Quiz has been submitted successfully..!! \n           THANK YOU.');
//     // ToastAndroid.showWithGravity('Quiz Submitted Sucessfully...!!!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
//     // setScore(0);
//     navigation.navigate('Home');
//   };

//   const windowWidth = Dimensions.get('window').width;
//   const circleRadius = 20;
//   const strokeWidth = 5;
//   const circumference = 2 * Math.PI * circleRadius;
//   const progress = (1 - timer / 15) * circumference;

//   if (questions.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
//   console.log("questions :--",questions);
//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/MI.png')} style={styles.image} />
//           <Text style={styles.imageText}>MI</Text>
//         </View>
//         <Text style={styles.centerText}>VS</Text>
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/CSK.png')} style={styles.image} />
//           <Text style={styles.imageText}>CSK</Text>
//         </View>
//       </View>
//       <View style={styles.line}>
//         <Text style={styles.lineText}>
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </Text>
//         <View style={styles.timerContainer}>
//           <Svg width={2 * circleRadius} height={2 * circleRadius}>
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#000000"
//               strokeWidth={strokeWidth}
//               fill="transparent"
//             />
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#FF0000"
//               strokeWidth={strokeWidth}
//               strokeDasharray={circumference}
//               strokeDashoffset={progress}
//               fill="transparent"
//             />
//             <SvgText
//               x={circleRadius}
//               y={circleRadius}
//               fontSize="20"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//               fill="#000"
//             >
//               {timer}
//             </SvgText>
//           </Svg>
//         </View>
//       </View>
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>{currentQuestion.question}</Text>
//         {currentQuestion.options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.answerBox,
//               selectedOption === index && { backgroundColor: 'lightgreen' },
//             ]}
//             onPress={() => handleButtonPress(index)}
//           >
//             <Text>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.buttonContainer}>
//         {currentQuestionIndex === questions.length - 1 ? (
//           <TouchableOpacity style={styles.additionalBox2} onPress={handleNext}>
//             <Text style={{ fontSize: 19, fontWeight: "bold" }}>SUBMIT</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.additionalBox} onPress={handleNext}>
//             <Text style={{ fontSize: 19, fontWeight: "bold" }}>NEXT</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//     </View>
//   );
// }

// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F0ECE5',
//   },
//   box: {
//     width: windowWidth * 0.9,
//     height: 70,
//     backgroundColor: 'white',
//     marginTop: 10,
//     borderRadius: 10,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   line: {
//     marginTop: 50,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     width: windowWidth * 0.9,
//   },
//   lineText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   timerContainer: {
//     alignItems: 'center',
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginBottom: 5,
//   },
//   imageText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   centerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   questionContainer: {
//     alignItems: 'center',
//   },
//   questionText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   answerBox: {
//     width: windowWidth * 0.7,
//     height: 50,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 25,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//     justifyContent:'flex-end',
//     width: windowWidth * 0.5,
//   },
//   additionalBox: {
//     flex: 1,
//     height: 50,
//     fontSize:30,
//     backgroundColor: 'lightblue',
//     borderRadius: 10,
//     alignItems:"center",
//     justifyContent:"center",
//     paddingHorizontal: 20,
//   },
//   additionalBox2: {
//     flex: 1,
//     height: 50,
//     fontSize:30,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     alignItems:"center",
//     justifyContent:"center",
//     paddingHorizontal: 20,
//     color:'white',
//   },
// });

// export default PlayQuiz;








// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
// import { Svg, Circle, Text as SvgText } from 'react-native-svg';
// import { database, auth } from '../../Firebase-config.js'; // Adjust the import path to your Firebase config
// import { ref, get, update } from 'firebase/database';
// import Toast from 'react-native-toast-message';

// function PlayQuiz({ navigation }) {
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [timer, setTimer] = useState(60); // Initial timer value
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [score, setScore] = useState(0);

//   const user = auth.currentUser; // Ensure the user is logged in
//   if (!user) {
//     navigation.navigate('Login'); // Redirect to login if not authenticated
//   }

//   // Fetch quiz data from Firebase
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       const quizRef = ref(database, 'quiz/questions');
//       const snapshot = await get(quizRef);
//       if (snapshot.exists()) {
//         setQuestions(snapshot.val());
//       } else {
//         console.log('No quiz data available');
//       }
//     };

//     fetchQuizData();
//   }, []);

//   useEffect(() => {
//     if (timer === 0) {
//       handleNext();
//     }

//     const interval = setInterval(() => {
//       setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleButtonPress = (buttonIndex) => {
//     setSelectedButton(buttonIndex);
//   };

//   const handleNext = () => {
//     if (selectedButton !== null) {
//       const correctOption = questions[currentQuestionIndex]?.correctOption;
//       if (selectedButton === correctOption) {
//         setScore((prevScore) => prevScore + 1);
//       }

//       setSelectedButton(null);
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//         setTimer(60); // Reset timer for the next question
//       } else {
//         handleQuizSubmit();
//       }
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'Please select an option before proceeding',
//         position: 'bottom',
//       });
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//       setTimer(60); // Reset timer for the previous question
//     }
//   };

//   const handleQuizSubmit = async () => {
//     const userRef = ref(database, `users/${user.uid}/quizResults`);
//     await update(userRef, {
//       score: score,
//       timestamp: Date.now(),
//     });
//     Toast.show({
//       type: 'success',
//       text1: 'Quiz submitted successfully!',
//       position: 'bottom',
//     });
//     navigation.navigate('Home');
//   };

//   const windowWidth = Dimensions.get('window').width;
//   const circleRadius = 20;
//   const strokeWidth = 5;
//   const circumference = 2 * Math.PI * circleRadius;
//   const progress = (1 - timer / 60) * circumference;

//   if (questions.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];
//   setQuestions(Object.keys(questions).map((question) => questions[question]));
//   console.log("quesion\\",questions);

//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/MI.png')} style={styles.image} />
//           <Text style={styles.imageText}>MI</Text>
//         </View>
//         <Text style={styles.centerText}>VS</Text>
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/CSK.png')} style={styles.image} />
//           <Text style={styles.imageText}>CSK</Text>
//         </View>
//       </View>
//       <View style={styles.line}>
//         <Text style={styles.lineText}>
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </Text>
//         <View style={styles.timerContainer}>
//           <Svg width={2 * circleRadius} height={2 * circleRadius}>
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#FF0000"
//               strokeWidth={strokeWidth}
//               fill="transparent"
//             />
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#F0ECE5"
//               strokeWidth={strokeWidth}
//               strokeDasharray={circumference}
//               strokeDashoffset={progress}
//               fill="transparent"
//             />
//             <SvgText
//               x={circleRadius}
//               y={circleRadius}
//               fontSize="20"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//               fill="#000"
//             >
//               {timer}
//             </SvgText>
//           </Svg>
//         </View>
//       </View>
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>{currentQuestion}</Text>
//         {currentQuestion.options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.answerBox,
//               selectedButton === index && { backgroundColor: 'lightgreen' },
//             ]}
//             onPress={() => handleButtonPress(index)}
//           >
//             <Text>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.additionalBox} onPress={handleBack}>
//           <Text>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.additionalBox} onPress={handleNext}>
//           <Text>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const windowWidth = Dimensions.get('window').width;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F0ECE5',
//   },
//   box: {
//     width: windowWidth * 0.9,
//     height: 70,
//     backgroundColor: 'white',
//     marginTop: 10,
//     borderRadius: 10,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   line: {
//     marginTop: 50,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     width: windowWidth * 0.9,
//   },
//   lineText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   timerContainer: {
//     alignItems: 'center',
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginBottom: 5,
//   },
//   imageText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   centerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   questionContainer: {
//     alignItems: 'center',
//   },
//   questionText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   answerBox: {
//     width: windowWidth * 0.7,
//     height: 50,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 25,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//     width: windowWidth * 0.9,
//   },
//   additionalBox: {
//     flex: 1,
//     height: 50,
//     backgroundColor: 'lightblue',
//     borderRadius: 10
//   },
// });


// export default PlayQuiz;








// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
// import { Svg, Circle, Text as SvgText } from 'react-native-svg';

// function PlayQuiz({ navigation }) {
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [timer, setTimer] = useState(60); // Initial timer value

//   const handleButtonPress = (buttonIndex) => {
//     setSelectedButton(buttonIndex);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);

//     // Clear interval when component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   const windowWidth = Dimensions.get('window').width;
//   const circleRadius = 20; // Adjust the radius of the circle
//   const strokeWidth = 5; // Adjust the stroke width of the circle's path
//   const circumference = 2 * Math.PI * circleRadius;
//   const progress = (1 - timer / 60) * circumference;

//   return (
//     <View style={styles.container}>
//       {/* Add a box with a specific height and width */}
//       <View style={styles.box}>
//         {/* Container for left image and text */}
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/MI.png')} style={styles.image} />
//           <Text style={styles.imageText}>MI</Text>
//         </View>
//         {/* Center text */}
//         <Text style={styles.centerText}>VS</Text>
//         {/* Container for right image and text */}
//         <View style={styles.imageContainer}>
//           <Image source={require('../../assets/Home/CSK.png')} style={styles.image} />
//           <Text style={styles.imageText}>CSK</Text>
//         </View>
//       </View>
//       {/* Texts positioned in a row */}
//       <View style={styles.line}>
//         <Text style={styles.lineText}>Question 1 of 11</Text>
//         <View style={styles.timerContainer}>
//           <Svg width={2 * circleRadius} height={2 * circleRadius}>
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#FF0000"
//               strokeWidth={strokeWidth}
//               fill="transparent"
//             />
//             <Circle
//               cx={circleRadius}
//               cy={circleRadius}
//               r={circleRadius - strokeWidth / 2}
//               stroke="#F0ECE5"
//               strokeWidth={strokeWidth}
//               strokeDasharray={circumference}
//               strokeDashoffset={progress}
//               fill="transparent"
//             />
//             <SvgText
//               x={circleRadius}
//               y={circleRadius}
//               fontSize="20"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//               fill="#000"
//             >
//               {timer}
//             </SvgText>
//           </Svg>
//         </View>
//       </View>
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>How is the Title Sponsor of the IPL 2024 ?</Text>
//         {/* Add four answer options */}
//         <TouchableOpacity
//           style={[styles.answerBox, selectedButton === 1 && { backgroundColor: 'lightgreen' }]}
//           onPress={() => handleButtonPress(1)}
//         >
//           <Text>Answer 1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.answerBox, selectedButton === 2 && { backgroundColor: 'lightgreen' }]}
//           onPress={() => handleButtonPress(2)}
//         >
//           <Text>Answer 2</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.answerBox, selectedButton === 3 && { backgroundColor: 'lightgreen' }]}
//           onPress={() => handleButtonPress(3)}
//         >
//           <Text>Answer 3</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.answerBox, selectedButton === 4 && { backgroundColor: 'lightgreen' }]}
//           onPress={() => handleButtonPress(4)}
//         >
//           <Text>Answer 4</Text>
//         </TouchableOpacity>
//       </View>
//       {/* Additional box at the end of the screen */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.additionalBox}>
//           <Text>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.additionalBox}>
//           <Text>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F0ECE5',
//   },
//   box: {
//     width: windowWidth * 0.9,
//     height: 70,
//     backgroundColor: 'white',
//     marginTop: 10,
//     borderRadius: 10,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row', // Arrange children horizontally
//   },
//   line: {
//     marginTop: 50,
//     justifyContent: 'space-between',
//     flexDirection: 'row', // Arrange children horizontally
//     width: windowWidth * 0.9, // Set a fixed width to the row
//   },
//   lineText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   timerContainer: {
//     alignItems: 'center',
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginRight: 20, // Add margin between image containers
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginBottom: 5, // Add margin between image and text
//   },
//   imageText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   centerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   questionContainer: {
//     alignItems: 'center',
//   },
//   questionText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   answerBox: {
//     width: windowWidth * 0.7,
//     height: 50,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 25,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//     width: windowWidth * 0.9,
//   },
//   additionalBox: {
//     flex: 1,
//     height: 50,
//     backgroundColor: 'lightblue',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
// });

// export default PlayQuiz;