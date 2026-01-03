
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBudget } from '@/contexts/BudgetContext';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const router = useRouter();
  const { currency, setCurrency, resetData } = useBudget();

  const currencies = [
    { symbol: '$', name: 'US Dollar' },
    { symbol: '€', name: 'Euro' },
    { symbol: '£', name: 'British Pound' },
    { symbol: '¥', name: 'Japanese Yen' },
    { symbol: 'C$', name: 'Canadian Dollar' },
    { symbol: 'A$', name: 'Australian Dollar' },
  ];

  const handleCurrencyChange = () => {
    Alert.alert(
      'Select Currency',
      'Choose your preferred currency',
      currencies.map(curr => ({
        text: `${curr.symbol} ${curr.name}`,
        onPress: () => setCurrency(curr.symbol),
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will permanently delete all your budget data, expenses, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetData();
            Alert.alert('Data Reset', 'All your data has been cleared.');
          },
        },
      ]
    );
  };

  const handleViewDisclaimer = () => {
    router.push('/disclaimer');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Customize your experience
          </Text>
        </View>

        {/* Currency Setting */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Preferences
          </Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleCurrencyChange}
          >
            <View style={styles.settingLeft}>
              <IconSymbol
                ios_icon_name="dollarsign.circle.fill"
                android_material_icon_name="attach-money"
                size={24}
                color={theme.primary}
              />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Currency
                </Text>
                <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
                  {currencies.find(c => c.symbol === currency)?.name || 'US Dollar'}
                </Text>
              </View>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="arrow-forward"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Information */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Information
          </Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleViewDisclaimer}
          >
            <View style={styles.settingLeft}>
              <IconSymbol
                ios_icon_name="info.circle.fill"
                android_material_icon_name="info"
                size={24}
                color={theme.primary}
              />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Disclaimer
                </Text>
                <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
                  Important information
                </Text>
              </View>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="arrow-forward"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Data Management
          </Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleResetData}
          >
            <View style={styles.settingLeft}>
              <IconSymbol
                ios_icon_name="trash.fill"
                android_material_icon_name="delete"
                size={24}
                color={theme.warning}
              />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: theme.warning }]}>
                  Reset All Data
                </Text>
                <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
                  Clear all budget information
                </Text>
              </View>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="arrow-forward"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={[styles.aboutCard, { backgroundColor: theme.primary + '20' }]}>
          <IconSymbol
            ios_icon_name="heart.fill"
            android_material_icon_name="favorite"
            size={32}
            color={theme.primary}
          />
          <View style={styles.aboutContent}>
            <Text style={[styles.aboutTitle, { color: theme.text }]}>
              You&apos;re Not Alone
            </Text>
            <Text style={[styles.aboutText, { color: theme.textSecondary }]}>
              This app is designed to help you navigate challenging financial times with clarity and confidence. Remember, this is temporary, and you&apos;re taking positive steps forward.
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
  },
  aboutCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aboutContent: {
    flex: 1,
    marginLeft: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
