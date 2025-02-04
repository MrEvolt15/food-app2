import React from 'react';
import { StyleSheet, Text, View,Pressable,Image } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomePage = () => {
    return (
        <View style={styles.container}>
            
            <Image source={require('../assets/icon.png')} style={{ width: 200, height: 200, marginBottom: 100 }}>

            </Image>
            <Text style={styles.title}>Bienvenido a la app de Detección de Comidas</Text>
            <Text style={styles.subtitle}>Diviertete!!!</Text>
            <Pressable style={styles.button}>
                <Link replace href="/home">Login</Link>
            </Pressable>
        </View>
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
    button: {
        marginTop: 200,
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
    },
});

export default HomePage;