import React from 'react';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomePage = () => {

    // Datos quemados del usuario
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        caloriesToday: 1500,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Food App</Text>
            <View style={styles.dashboard}>
                <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.card}>
                    <Text style={styles.cardTitle}>User Information</Text>
                    <Text style={styles.userInfo}>Name: {userData.name}</Text>
                </LinearGradient>
                <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.card}>
                    <Text style={styles.cardTitle}>Email</Text>
                    <Text style={styles.userInfo}>
                        {userData.email ? userData.email : 'No email provided'}
                    </Text>
                </LinearGradient>
                <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.card}>
                    <Text style={styles.cardTitle}>Calories Today</Text>
                    <Text style={styles.userInfo}>{userData.caloriesToday}</Text>
                </LinearGradient>
            </View>
            <Pressable style={styles.button} >
                <Link replace href={"/"}>Logout</Link>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        backgroundColor: 'rgb(59, 58, 58)', 
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    button: {
        backgroundColor: '#FFD700', // Gold color
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dashboard: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
    },
});

export default HomePage;