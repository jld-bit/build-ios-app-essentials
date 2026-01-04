
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { currency, setCurrency, resetData } = useBudget();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const currencies = ['$', '€', '£', '¥', '₹'];

  // App icon configuration from app.json
  const appIconPath = require('@/assets/images/11fa71a6-ca51-470a-8c38-a998103e36e9.png');
  const iconConfigPath = './assets/images/11fa71a6-ca51-470a-8c38-a998103e36e9.png';

  const handleCurrencyChange = () => {
    Alert.alert(
      'Select Currency',
      '',
      currencies.map(curr => ({
        text: curr,
        onPress: () => setCurrency(curr),
      }))
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will delete all your budget data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetData();
            Alert.alert('Success', 'All data has been reset');
          },
        },
      ]
    );
  };

  const handleViewDisclaimer = () => {
    router.push('/disclaimer');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Settings
        </Text>

        {/* App Icon Section */}
        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <View style={styles.iconSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              App Icon Configuration
            </Text>
            <View style={styles.iconPreviewContainer}>
              <Image 
                source={appIconPath} 
                style={styles.iconPreview}
                resizeMode="contain"
              />
              <View style={styles.iconDetails}>
                <Text style={[styles.iconLabel, { color: isDark ? '#b0b0b0' : '#666' }]}>
                  iOS Icon
                </Text>
                <Text style={[styles.iconPath, { color: isDark ? '#888' : '#999' }]} numberOfLines={2}>
                  {iconConfigPath}
                </Text>
                
                <Text style={[styles.iconLabel, { color: isDark ? '#b0b0b0' : '#666', marginTop: 12 }]}>
                  Android Icon
                </Text>
                <Text style={[styles.iconPath, { color: isDark ? '#888' : '#999' }]} numberOfLines={2}>
                  {iconConfigPath}
                </Text>
                
                <Text style={[styles.iconLabel, { color: isDark ? '#b0b0b0' : '#666', marginTop: 12 }]}>
                  Splash Screen
                </Text>
                <Text style={[styles.iconPath, { color: isDark ? '#888' : '#999' }]} numberOfLines={2}>
                  {iconConfigPath}
                </Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: isDark ? '#1e3a1e' : '#e8f5e9' }]}>
              <Text style={[styles.statusText, { color: isDark ? '#4caf50' : '#2e7d32' }]}>
                ✓ Icon Uploaded & Configured
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <TouchableOpacity style={styles.settingRow} onPress={handleCurrencyChange}>
            <Text style={[styles.settingLabel, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              Currency
            </Text>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: isDark ? '#b0b0b0' : '#666' }]}>
                {currency}
              </Text>
              <Text style={[styles.chevron, { color: isDark ? '#b0b0b0' : '#666' }]}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <TouchableOpacity style={styles.settingRow} onPress={handleViewDisclaimer}>
            <Text style={[styles.settingLabel, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              Disclaimer
            </Text>
            <Text style={[styles.chevron, { color: isDark ? '#b0b0b0' : '#666' }]}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: isDark ? '#3a1e1e' : '#fff5f5' }]}
          onPress={handleResetData}
        >
          <Text style={styles.resetButtonText}>Reset All Data</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: isDark ? '#666' : '#999' }]}>
          Budget App v1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  iconPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  iconPreview: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#000',
  },
  iconDetails: {
    flex: 1,
  },
  iconLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  iconPath: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
  resetButton: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 24,
  },
  resetButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 14,
  },
});
