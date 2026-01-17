import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Gradient background for scenes
        contentStyle: { backgroundColor: 'transparent' },
        sceneStyle: { backgroundColor: 'transparent' },

        animation: Platform.OS === 'android' ? 'none' : 'default',

        tabBarActiveTintColor: '#a78bfa', // violet accent
        tabBarInactiveTintColor: '#c4c5c7',

        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
        },

        tabBarBackground: () => (
          <LinearGradient
            colors={['#2f2978', '#0c0c21', '#2f2978']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          unmountOnBlur: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="family"
        options={{
          title: 'Family',
          unmountOnBlur: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          unmountOnBlur: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}