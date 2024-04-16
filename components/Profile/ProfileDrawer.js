// ProfileDrawer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileDrawer = ({ navigation }) => {
  const handleDrawerItemClick = (item) => {
    console.log(`${item} clicked`);
    navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleDrawerItemClick('Item 1')}>
        <Text style={styles.drawerItem}>Item 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDrawerItemClick('Item 2')}>
        <Text style={styles.drawerItem}>Item 2</Text>
      </TouchableOpacity>
      {/* Add more drawer items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default ProfileDrawer;
