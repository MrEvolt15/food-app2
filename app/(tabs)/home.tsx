import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useState, useCallback,  useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatsCard from '../../components/statsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { getUserByName, getPrediccionesByUserId,updateUserCalories } from '../../utils/database';

const HomePage = () => {
    const [photoData, setPhotoData] = useState([]);
    const { user } = useAuth();
    const [userData, setUserData] = useState({id:0, name: '', caloriesToday: 0, predicciones: [] });

    const foodData = [
        { name: 'Banana', calories: 89 },
        { name: 'Fresa', calories: 32 },
        { name: 'Mango', calories: 60 },
        { name: 'Manzana', calories: 52 },
        { name: 'Naranja', calories: 47 },
        { name: 'Piña', calories: 50 },
        { name: 'Sandía', calories: 30 },
    ];

    useEffect(() => {
        const fetchUserData = () => {
            if (user) {
                const usuario = getUserByName(user) as { id: number, name: string, caloriesToday: number };
                const predicciones = getPrediccionesByUserId(usuario.id) as { id: number, prediction: string, probability: number }[];
                

                setUserData({
                    id: usuario.id,
                    name: usuario.name,
                    caloriesToday: usuario.caloriesToday,
                    predicciones: predicciones,

                });
            }
        };

        fetchUserData();
    }, [user]);

    const fetchPhotoData = async () => {
        const data = await AsyncStorage.getItem('photoData');
        if (data) {
            setPhotoData(JSON.parse(data));
        }
    };
    let totalCalories = userData.caloriesToday;
    for (const prediccion of userData.predicciones) {
        console.log(prediccion.prediccion);
        const foodItem = foodData.find(food => food.name === prediccion.prediccion);
        if (foodItem) {
            totalCalories += foodItem.calories;
        }
    }
    console.log(userData.id);
    updateUserCalories(userData.id, totalCalories);
    useFocusEffect(
        useCallback(() => {
            fetchPhotoData();
        }, [])
    );

    return (
        <ScrollView style={{ flexGrow: 1, backgroundColor: 'rgb(59, 58, 58)' }} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido, {userData.name}!</Text>
                <View style={styles.dashboard}>
                    <LinearGradient colors={['#FFA500', '#FF4500']} style={styles.card}>
                        <Text style={styles.cardTitle}>Información del Usuario</Text>
                        <Text style={styles.userInfo}>Nombre: {userData.name}</Text>
                        <Text style={styles.userInfo}>Calorias Total: {userData.caloriesToday}</Text>
                    </LinearGradient>
                    <View style={styles.separator}></View>
                    {photoData.map((data, index) => (
                        console.log(data),
                        <StatsCard key={index} imagePath={{ uri: data.uri }} title={data.prediction} subtitle={data.probability} />
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