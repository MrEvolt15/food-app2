import React from 'react';
import { StyleSheet, Text, View, Pressable, ProgressBarAndroidBase } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
                <View style={styles.separator}>
                </View>
                <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.card}>
                    <View style={styles.calories}>
                    <Text style={styles.cardTitle}>Calories Today</Text>
                    <Text style={styles.userInfo}>{userData.caloriesToday}</Text>
                    </View>
                    <View style={styles.progressBar}>
                        
                        <AnimatedCircularProgress
                            size={120}
                            width={15}
                            fill={100}
                            tintColor="#00e0ff"
                            duration={2000}
                            lineCap='round'
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="#3d5875" />
                    </View>
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
    calories: {
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        width: '100%',
        height: 5,
        display: 'flex',
        marginVertical: 10,
        borderBottomColor: '#FBFBFB' ,
        borderBottomWidth: 5,
    },
    progressBar:{
        flexDirection: 'row',
        justifyContent: 'center',
        
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
        alignItems: 'stretch',
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