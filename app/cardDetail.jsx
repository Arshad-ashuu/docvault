import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

export default function CardDetail() {
  const { cardName, sectionTitle, images } = useLocalSearchParams()
  const [cardImages] = useState(images ? JSON.parse(images) : [])
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleEdit = () => {
    Alert.alert('Edit Document', 'Edit functionality coming soon!')
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Document',
      `Are you sure you want to delete "${cardName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete logic here
            router.back()
          }
        }
      ]
    )
  }

  const handleShare = () => {
    Alert.alert('Share Document', 'Share functionality coming soon!')
  }

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerText}>{cardName}</Text>
            <Text style={styles.headerSubtext}>Document Details</Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Document Info Card */}
          <View style={styles.infoSection}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.15)', 'rgba(99, 102, 241, 0.1)']}
              style={styles.infoCard}
            >
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Ionicons name="folder-outline" size={20} color="#8b5cf6" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Category</Text>
                  <Text style={styles.infoValue}>{sectionTitle}</Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(139, 92, 246, 0.15)', 'rgba(99, 102, 241, 0.1)']}
              style={styles.infoCard}
            >
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Ionicons name="document-text-outline" size={20} color="#8b5cf6" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Document Name</Text>
                  <Text style={styles.infoValue}>{cardName}</Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(139, 92, 246, 0.15)', 'rgba(99, 102, 241, 0.1)']}
              style={styles.infoCard}
            >
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Ionicons name="images-outline" size={20} color="#8b5cf6" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Total Images</Text>
                  <Text style={styles.infoValue}>
                    {cardImages.length} {cardImages.length === 1 ? 'image' : 'images'}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Images Section */}
          {cardImages.length > 0 ? (
            <View style={styles.imageSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Saved Images</Text>
                <View style={styles.imageCounter}>
                  <Text style={styles.imageCounterText}>
                    {activeImageIndex + 1}/{cardImages.length}
                  </Text>
                </View>
              </View>
              
              <ScrollView 
                horizontal 
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32))
                  setActiveImageIndex(index)
                }}
                style={styles.imageCarousel}
              >
                {cardImages.map((uri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image 
                      source={{ uri }} 
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.5)']}
                      style={styles.imageOverlay}
                    >
                      <View style={styles.imageTag}>
                        <Ionicons name="image" size={14} color="#fff" />
                        <Text style={styles.imageTagText}>Image {index + 1}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                ))}
              </ScrollView>

              {cardImages.length > 1 && (
                <View style={styles.pagination}>
                  {cardImages.map((_, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.paginationDot,
                        index === activeImageIndex && styles.paginationDotActive
                      ]} 
                    />
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.noImages}>
              <Ionicons name="image-outline" size={48} color="rgba(255,255,255,0.3)" />
              <Text style={styles.noImagesText}>No images added yet</Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard} onPress={handleShare}>
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.1)']}
                  style={styles.actionGradient}
                >
                  <View style={styles.actionIcon}>
                    <Ionicons name="share-social-outline" size={24} color="#3b82f6" />
                  </View>
                  <Text style={styles.actionText}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Download', 'Coming soon!')}>
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.2)', 'rgba(5, 150, 105, 0.1)']}
                  style={styles.actionGradient}
                >
                  <View style={styles.actionIcon}>
                    <Ionicons name="download-outline" size={24} color="#10b981" />
                  </View>
                  <Text style={styles.actionText}>Download</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Print', 'Coming soon!')}>
                <LinearGradient
                  colors={['rgba(245, 158, 11, 0.2)', 'rgba(217, 119, 6, 0.1)']}
                  style={styles.actionGradient}
                >
                  <View style={styles.actionIcon}>
                    <Ionicons name="print-outline" size={24} color="#f59e0b" />
                  </View>
                  <Text style={styles.actionText}>Print</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEdit}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#8b5cf6', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.editButtonGradient}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginTop: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  infoSection: {
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  imageSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  imageCounter: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  imageCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  imageCarousel: {
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  cardImage: {
    width: width - 32,
    height: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  imageTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: '#8b5cf6',
    width: 24,
  },
  noImages: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  noImagesText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    paddingBottom: 24,
    backgroundColor: 'rgba(30, 27, 75, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  editButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  editButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 16,
    padding: 16,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '700',
  },
})