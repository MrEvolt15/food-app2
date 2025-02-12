import { LinearGradient } from 'expo-linear-gradient';
import { Link, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import StatsCard from '../../components/statsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
    const [photoUris, setPhotoUris] = useState<string[]>([]);

    // Datos quemados del usuario
    const userData = {
        name: 'Joel Espinosa',
        caloriesToday: 1500,
    };

    const fetchPhotoUris = async () => {
        const uris = await AsyncStorage.getItem('photoUris');
        if (uris) {
            setPhotoUris(JSON.parse(uris));
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPhotoUris();
        }, [])
    );

    return (
        <ScrollView style={{ flexGrow: 1, backgroundColor: 'rgb(59, 58, 58)' }} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido, {userData.name}!</Text>
                <View style={styles.dashboard}>
                    <LinearGradient colors={['#FFA500', '#FF4500']} style={styles.card}>
                        <Text style={styles.cardTitle}>User Information</Text>
                        <Text style={styles.userInfo}>Name: {userData.name}</Text>
                        <Text style={styles.userInfo}>Calorias Total: {userData.caloriesToday}</Text>
                    </LinearGradient>
                    <View style={styles.separator}>
                    </View>
                    <StatsCard imagePath={require('../../assets/icon.png')} />
                    {photoUris.map((uri, index) => (
                        <StatsCard key={index} imagePath={{ uri }} />
                    ))}
                </View>
            </View>
        </ScrollView>
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
    contentContainer: {
        justifyContent: 'flex-start',
            },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    calories: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    separator: {
        width: '100%',
        height: 5,
        
        marginVertical: 10,
        borderBottomColor: '#FBFBFB',
        borderBottomWidth: 5,
    },
    progressBar: {
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
        color: '#fff',
    },
    userInfo: {
        fontSize: 16,
        color: '#fff',
    },
    photo: {
        width: 300,
        height: 300,
        marginVertical: 20,
    },
});

export default HomePage;