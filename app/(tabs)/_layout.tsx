import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs  screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
              backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
            backgroundColor: '#25292e',
            },
          }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: 'Camera',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} />,
                }}
            />
            <Tabs.Screen
                name="live"
                options={{
                    title: 'Live',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="video-camera" color={color} />,
                }}
            />
        </Tabs>
    );
}