import React, { useState, createContext,useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { getUserByName } from '../utils/database';
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();
    

    const handleLogin = async () => {
        try {
            console.log(username);
            const user = await getUserByName(username);
            // Aquí puedes agregar la lógica de autenticación
            if (username === user.name && password === user.password) {
                login(user.name);
                Alert.alert('Login Successful', 'Welcome to the app!', [{ onPress: () => router.push('/home') }]);
            } else {
                console.log(user);
                Alert.alert('Login Failed', 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Revise sus credenciales o registrese');
        }
    };

    return (
  
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image source={require('../assets/icon.png')} style={{ marginBottom: 20 }} />
                    <Text style={styles.title}>Bienvenido !!</Text>
                    <Text style={styles.subtitle}>Por favor, inicia sesión</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de usuario"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Link replace href="/register" style={styles.buttonText}>Registrar</Link>
                    </Pressable>
                </ScrollView>
            </View>
 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(59, 58, 58)',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
    },
});

export default HomePage;