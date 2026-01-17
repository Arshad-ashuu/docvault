import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../../config/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      })

      if (error) {
        Alert.alert('Sign Up Failed', error.message)
      } else {
        Alert.alert(
          'Success!', 
          'Account created successfully. Please sign in.',
          [{ text: 'OK', onPress: () => router.replace('/(auth)/signin') }]
        )
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
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <LinearGradient
                                   colors={['#4c1d95', '#0c0c21', '#3f35d5']}

                  style={styles.logoGradient}
                >
                  <Ionicons name="person-add" size={32} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Start securing your documents today</Text>
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

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#8b5cf6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#64748B"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#64748B" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.requirementBox}>
                <Ionicons name="information-circle-outline" size={18} color="#a78bfa" />
                <Text style={styles.requirementText}>Password must be at least 6 characters</Text>
              </View>

              <TouchableOpacity 
                style={styles.button}
                onPress={handleSignUp}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#6447aa', '#5657ba']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  {loading ? (
                    <Text style={styles.buttonText}>Creating Account...</Text>
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Create Account</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
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
    shadowColor: '#8b5cf6',
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
    borderColor: 'rgba(139, 92, 246, 0.3)',
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
  requirementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  requirementText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    flex: 1,
  },
  button: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
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