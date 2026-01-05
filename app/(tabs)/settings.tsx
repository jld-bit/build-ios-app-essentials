
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';
import { useRouter } from 'expo-router';
import appJson from '../../app.json';

export default function SettingsScreen() {
  const { currency, setCurrency, resetData } = useBudget();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const currencies = ['$', '€', '£', '¥', '₹'];

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
          Budget App v{appJson.expo.version}
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
