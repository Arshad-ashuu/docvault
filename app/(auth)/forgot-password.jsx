import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../../config/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'myapp://reset-password',
      })

      if (error) {
        Alert.alert('Error', error.message)
      } else {
        Alert.alert(
          'Check Your Email',
          'We sent you a password reset link. Please check your email.',
          [{ text: 'OK', onPress: () => router.back() }]
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
          <View style={styles.content}>
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <LinearGradient
                colors={['#4c1d95', '#0c0c21', '#281bd3']}
                style={styles.logoGradient}
              >
                <Ionicons name="key-outline" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your email and we'll send you a link to reset your password
              </Text>
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

              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#6447aa', '#5657ba']}
                  start={{ x:0, y: 5 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Text>
                  {!loading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Remember your password?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Sign In</Text>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 24,
    zIndex: 10,
  },
  backText: {
    color: '#a78bfa',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
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
  button: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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