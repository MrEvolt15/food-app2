import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aquí puedes agregar la lógica de autenticación
        if (username === 'admin' && password === 'password') {
            Alert.alert('Login Successful', 'Welcome to the app!');
        } else {
            Alert.alert('Login Failed', 'Invalid username or password');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        < View style = { styles.container } >
            <Image source={require('../assets/icon.png')} style={{
                marginBottom: 20,
            }}/>
            <Text style={styles.title}>Bienvenido a la app de Detección de Comidas</Text>
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
            <Pressable style={styles.link}>
                <Link replace href="/home">Ir a la página principal</Link>
            </Pressable>
        </View >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(59, 58, 58)',
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