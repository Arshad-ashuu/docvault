import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function Family() {
  const [members] = useState([
    { id: 1, name: 'John Doe', role: 'Father', icon: 'man-outline' },
    { id: 2, name: 'Jane Doe', role: 'Mother', icon: 'woman-outline' },
    { id: 3, name: 'Emma Doe', role: 'Daughter', icon: 'female-outline' },
    { id: 4, name: 'Alex Doe', role: 'Son', icon: 'male-outline' },
  ])

  return (
    <LinearGradient
            colors={['#1e1b4b', '#0c0c21']}

      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Family Members</Text>
          <Text style={styles.subHeaderText}>{members.length} members</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {members.map((member) => (
            <TouchableOpacity key={member.id} style={styles.card}>
              <LinearGradient
                                      colors={['#6b4cb4', '#2f31b3']}

                style={styles.iconContainer}
              >
                {/* Option 1: Use Ionicons */}
                <Ionicons name={member.icon} size={28} color="#fff" />

                {/* Option 2: Use Image avatar */}
                {/* 
                <Image
                  source={{ uri: 'https://api.dicebear.com/9.x/avataaars-neutral/svg' }}
                  style={styles.avatarImage}
                  resizeMode="contain"
                />
                */}
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={['#6447aa', '#5657ba']}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.addButtonText}>Add Family Member</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subHeaderText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245,243,251,0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  cardContent: { flex: 1 },
  memberName: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4 },
  memberRole: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  arrow: { fontSize: 24, color: '#64748B', fontWeight: '300' },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 8,
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  addButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
})