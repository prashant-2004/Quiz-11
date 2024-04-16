//02-03-2024 = OriginalEditProfile
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

const ProfileSection = ({ navigation }) => {
  const [userName, setUserName] = useState('Vaibhav Nirgude');
  const [userNumber, setUserNumber] = useState('9529695968');
  const [userEmail, setUserEmail] = useState('example@email.com');
  const [editableName, setEditableName] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSaveChanges = () => {
    setUserName(editableName);
    setUserEmail(editableEmail);
    setEditing(false);
    console.log('Saved:', editableName, editableEmail);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfBackground} />

      <View style={styles.userDetails}>
        <Image source={require('../assets/profile.png')} style={styles.avatar} />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userNumber}>{userNumber}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <Text style={styles.detailsHeaderText}>Your Details</Text>

      {/* Editable Text Field for Name */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setEditableName(text)}
          value={editableName}
          editable={editing}
        />
        {!editing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {editing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
        <View style={styles.inputLine} />
      </View>

      {/* Editable Text Field for Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEditableEmail(text)}
          value={editableEmail}
          editable={editing}
        />
        {!editing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {editing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
        <View style={styles.inputLine} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText1: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginLeft: 80,
    fontSize: 30,
    fontStyle: 'italic',
  },
  headerButtonImage: {
    width: 30,
    height: 25,
  },
  userDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userNumber: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  detailsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 70,
  },
  input: {
    fontSize: 21,
    width: '100%',
    height: 60,
    //backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: -13,
    padding: 2,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 1,
    position: 'relative',
  },
  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 26,
  },
  editButtonText: {
    color: 'black',
    fontSize: 18,
  },
  saveButton: {
    position: 'absolute',
    right: 0,
    top: 26,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
  },
  halfBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 270, // Adjust the height as needed
    backgroundColor: '#A3CCF5',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
});

export default ProfileSection;
