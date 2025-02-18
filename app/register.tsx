import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createTables, insertUser } from '../utils/database';

import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [caloriesToday, setCaloriesToday] = useState('');
   const router = useRouter();

  useEffect(() => {
    const initializeDatabase = async () => {
       createTables();
    };

    initializeDatabase();
  }, []);

  const handleRegister = async () => {
    if (name && email && password && caloriesToday) {
       insertUser(name, email, password, parseInt(caloriesToday));
       console.log(name,password);
    Alert.alert('Success', 'User registered successfully', [
      { text: 'OK', onPress: () => router.push('/') },
    ]);
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Calories Today"
        value={caloriesToday}
        onChangeText={setCaloriesToday}
        keyboardType="numeric"
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgb(59, 58, 58)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default RegisterScreen;