import React, { useState, useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import WinnersScreen from '../Tab/WinnersScreen';
import ProfileScreen from '../Tab/ProfileScreen';
import WalletScreen from '../Tab/WalletScreen';
import StatusBar from '../Tab/StatusBar';

const Tab = createBottomTabNavigator();

const LogoComponent = () => (
  <Image
    source={require('../../assets/App_Logo/quiz11_icon.png')}
    style={{ width: 40, height: 40, marginLeft: 10 }}
  />
);

const Quiz11Content = () => {
  const navigation = useNavigation(); // Get the navigation object
  const boxData = [
    { key: '1', content: 'Indian Premier League, T20', leftText: 'MI', leftImage: require('../../assets/Home/MI.png'), rightText: 'CSK', rightImage: require('../../assets/Home/CSK.png') },
    { key: '2', content: 'Indian Premier League, T20', leftText: 'GT', leftImage: require('../../assets/Home/CSK.png'), rightText: 'RR', rightImage: require('../../assets/Home/MI.png') },
    { key: 'image', images: [require('../../assets/Home/Sponsors.png'), require('../../assets/Home/Sponsors.png')], type: 'scrollview' }, // Add the ScrollView entry
    { key: '3', content: 'Indian Premier League, T20', leftText: 'LSG', leftImage: require('../../assets/Home/MI.png'), rightText: 'KKR', rightImage: require('../../assets/Home/CSK.png') },
    { key: '4', content: 'Indian Premier League, T20', leftText: 'MI', leftImage: require('../../assets/App_Logo/quiz11_icon.png'), rightText: 'CSK', rightImage: require('../../assets/App_Logo/quiz11_icon.png') },
    { key: '5', content: 'Indian Premier League, T20', leftText: 'GT', leftImage: require('../../assets/Home/MI.png'), rightText: 'RR', rightImage: require('../../assets/App_Logo/quiz11_icon.png') },
    { key: '6', content: 'Indian Premier League, T20', leftText: 'LSG', leftImage: require('../../assets/App_Logo/quiz11_icon.png'), rightText: 'KKR', rightImage: require('../../assets/Home/MI.png') },
    // Add similar entries for other boxes
  ];

  const renderImages = (images) => {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        scrollViewRef.current.scrollTo({ x: activeIndex * 300, animated: true });
      }, 3000);

      return () => clearInterval(interval);
    }, [activeIndex, images.length]);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        pagingEnabled
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.scrollViewImage} />
        ))}
      </ScrollView>
    );
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }) => {
    // Declare onPressButton function
    const onPressButton = () => {
      console.log('Button Pressed for:', item.content);
      navigation.navigate('JoinQuiz');
    };

    if (item.type === 'scrollview') {
      // Render the ScrollView
      return (
        <View style={styles.scrollViewContainer}>
          {renderImages(item.images)}
        </View>
      );
    }

    // Render regular boxes
    return (
      <View style={styles.itemBox}>
        <Text style={styles.boxContent}>{item.content}</Text>

        <View style={styles.additionalContent}>
          <View style={styles.leftContent}>
            <Image source={item.leftImage} style={styles.contentImage} />
            <Text style={styles.contentTextLeft}>{item.leftText}</Text>
          </View>

          <Text style={styles.centerContent}>VS</Text>

          <View style={styles.rightContent}>
            <Text style={styles.contentTextRight}>{item.rightText}</Text>
            <Image source={item.rightImage} style={styles.contentImage} />
          </View>
        </View>

        <View style={styles.nestedBox}>
          {/* Add the Notification Icon here */}
          <MaterialIcons name="add-alert" size={24} color="black" style={styles.notificationIcon} />
          <View style={styles.entryfee}><Text>Entry: ₹10</Text></View>
          <TouchableOpacity
            onPress={onPressButton}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

return (
  <View style={{ flex: 1, backgroundColor: '#F2F3F7' }}>
      <ScrollView>
      <Text style={styles.upcomingMatchesText}>Upcoming Cricket Matches</Text>
      
        {boxData.map((item, index) => (
          <View key={index}>
            {renderItem({ item, index })}
          </View>
        ))}
      </ScrollView>  
    </  View>
  );
};

const HomeScreen = ({ navigation }) => (
  <>
    <StatusBar />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Quiz11') {
            iconName = 'home';
          } else if (route.name === 'Wallet') {
            iconName = 'account-balance-wallet';
          } else if (route.name === 'Winners') {
            iconName = 'emoji-events';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen
        name="Quiz11"
        options={{
          tabBarLabel: 'Home',
          headerLeft: () => (
            <LogoComponent />
          ),
          headerStyle: {
            backgroundColor: '#A7242C',
            height: 60,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      >
        {() => <Quiz11Content />}
      </Tab.Screen>
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarLabel: 'Wallet' }}
      />
      <Tab.Screen
        name="Winners"
        component={WinnersScreen}
        options={{ tabBarLabel: 'Winners' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  </>
);

const styles = StyleSheet.create({
  itemBox: {
    width: 300,
    height: 130,
    backgroundColor: 'white',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: '#DAD5D7',
    borderWidth: 1,
  },
  upcomingMatchesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginStart: 15,
  },
  boxContent: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  additionalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTextLeft: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  contentTextRight: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  centerContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contentImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  nestedBox: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 1,
    marginTop: 18,
    borderTopColor: 'black',
    borderTopWidth: 2,
    justifyContent: 'space-between',  // Align the items with space in between
  },
  buttonContainer: {
    height: 30,
    width: '30%',
    backgroundColor: '#109E37',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginEnd: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationIcon: {
    backgroundColor: 'white',  // Background color for the icon
    marginStart: 10,  // Margin to separate from the button
  },
  scrollViewContainer: {
    width: 300,
    height: 150,
    alignSelf: 'center',
  },
  scrollViewImage: {
    width: 300,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default HomeScreen;
