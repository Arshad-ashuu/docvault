import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../../config/supabase'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        Alert.alert('Sign In Failed', error.message)
      } else {
        router.replace('/(tabs)')
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={['#1e1b4b', '#0c0c21', '#4c1d95']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <LinearGradient
                 colors={['#4c1d95', '#0c0c21', '#281bd3']}
                  style={styles.logoGradient}
                >
                  <Ionicons name="lock-closed" size={32} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to access your documents</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#8b5cf6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#64748B"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#8b5cf6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#64748B"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#64748B" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.forgotButton}
                onPress={() => router.push('/(auth)/forgot-password')}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button}
                onPress={handleSignIn}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#6447aa', '#5657ba']}
                  start={{ x:0, y: 5 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  {loading ? (
                    <Text style={styles.buttonText}>Signing In...</Text>
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Sign In</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 243, 251, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotText: {
    color: '#a78bfa',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  link: {
    color: '#a78bfa',
    fontSize: 14,
    fontWeight: '700',
  },
})