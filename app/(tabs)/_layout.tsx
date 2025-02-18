import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, StyleSheet } from 'react-native';

import type { NavigationProp } from '@react-navigation/native';
import { AuthProvider } from "../../context/AuthContext";

const HeaderButton = ({ navigation }: { navigation: NavigationProp<any> }) => (
  <Pressable style={styles.button} >
    <Link style={styles.buttonText} replace href={"/"}>Logout</Link>
    
  </Pressable>
);

export default function TabLayout() {
  return (
  
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
            shadowColor: 'transparent',
            elevation: 0,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
            display: 'none',
            },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
        headerRight: () => <HeaderButton navigation={navigation} />,
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} />,
        }}
      />
      
    </Tabs>
 
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF2810',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});