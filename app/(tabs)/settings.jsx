import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { supabase } from '../../config/supabase'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function Settings() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [notifications, setNotifications] = useState(true)
  // const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)
  }

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase.auth.signOut()
              router.replace('/(auth)/signin')
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out')
            }
          }
        }
      ]
    )
  }

  if (loading) {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#0c0c21', '#4c1d95']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#a78bfa" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: 1, label: 'Email', icon: 'mail-outline', type: 'info', value: user?.email || 'Not signed in' },
        { id: 2, label: 'User ID', icon: 'id-card-outline', type: 'info', value: user?.id || 'N/A' },
      ]
    },
    // {
    //   title: 'Preferences',
    //   items: [
    //     { id: 3, label: 'Notifications', icon: 'notifications-outline', type: 'toggle', value: notifications, onToggle: setNotifications },
    //     { id: 4, label: 'Dark Mode', icon: 'moon-outline', type: 'toggle', value: darkMode, onToggle: setDarkMode },
    //   ]
    // },
    // {
    //   title: 'Support',
    //   items: [
    //     { id: 5, label: 'Help Center', icon: 'help-circle-outline', type: 'link' },
    //     { id: 6, label: 'About', icon: 'information-circle-outline', type: 'link' },
    //   ]
    // }
  ]

  return (
    <LinearGradient
      colors={['#1e1b4b', '#0c0c21',]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* User Profile Card */}
          {user && (
            <LinearGradient
              colors={['#190931', '#0c0c21', ]}
              style={styles.profileCard}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.email?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user.email?.split('@')[0] || 'User'}
                </Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
              </View>
            </LinearGradient>
          )}

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.title}</Text>
              
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[
                    styles.settingItem,
                    itemIndex === 0 && styles.firstItem,
                    itemIndex === group.items.length - 1 && styles.lastItem
                  ]}
                  activeOpacity={item.type === 'toggle' || item.type === 'info' ? 1 : 0.7}
                  onPress={() => {
                    if (item.type === 'link') {
                      Alert.alert(item.label, 'Feature coming soon!')
                    }
                  }}
                >
                  <View style={styles.settingLeft}>
                    <LinearGradient
                      colors={['#6b4cb4', '#2f31b3']}
                      style={styles.iconContainer}
                    >
                      <Ionicons name={item.icon} size={20} color="#fff" />
                    </LinearGradient>
                    <View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      {item.type === 'info' && (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      )}
                    </View>
                  </View>
                  
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#334155', true: '#a78bfa' }}
                      thumbColor={item.value ? '#fff' : '#94A3B8'}
                    />
                  ) : item.type === 'link' ? (
                    <Text style={styles.arrow}>›</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Sign Out Button */}
          {user && (
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleSignOut}
            >
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          )}

          {/* Not Signed In */}
          {!user && (
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => router.push('/(auth)/signin')}
            >
              <LinearGradient
                colors={['#350a99', '#5657ba']}
                style={styles.signInGradient}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 10 },
  headerText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5f5a6e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: '#f8f5f5' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4, textTransform: 'capitalize' },
  profileEmail: { fontSize: 14, color: 'rgba(243, 242, 242, 0.7)' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#f6f4fa', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4 },
  settingItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderColor: 'rgba(245,243,251,0.2)',
    borderTopWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
    firstItem: { 
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: { 
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 1,
  },
  settingLeft: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: { 
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: { 
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  settingValue: { 
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  arrow: { 
    fontSize: 24,
    color: '#fbfcfd',
    fontWeight: '300',
  },
  logoutButton: { 
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 68,
  },
  logoutText: { 
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  signInButton: { 
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInGradient: { 
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: { 
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  version: { 
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginBottom: 24,
  },
})