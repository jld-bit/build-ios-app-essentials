
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function DisclaimerScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={64}
            color={theme.primary}
          />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          Important Disclaimer
        </Text>

        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.body, { color: theme.text }]}>
            This app is for general budgeting guidance only. It does not provide financial, legal, or professional advice.
          </Text>
          
          <Text style={[styles.body, { color: theme.text, marginTop: 16 }]}>
            Users are responsible for their own financial decisions. The information and tools provided in this app are meant to help you organize and understand your expenses, but should not be considered as professional financial advice.
          </Text>

          <Text style={[styles.body, { color: theme.text, marginTop: 16 }]}>
            If you are experiencing financial difficulties, we encourage you to:
          </Text>

          <View style={styles.list}>
            <Text style={[styles.listItem, { color: theme.text }]}>
              • Consult with a qualified financial advisor
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>
              • Contact your creditors to discuss payment options
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>
              • Explore local community resources and assistance programs
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>
              • Seek professional legal advice if needed
            </Text>
          </View>

          <Text style={[styles.body, { color: theme.text, marginTop: 16 }]}>
            This app stores all data locally on your device. We do not collect, transmit, or store any of your personal or financial information on external servers.
          </Text>

          <Text style={[styles.body, { color: theme.text, marginTop: 16 }]}>
            By using this app, you acknowledge that you understand and accept these terms.
          </Text>
        </View>

        <View style={[styles.supportCard, { backgroundColor: theme.success + '20' }]}>
          <IconSymbol
            ios_icon_name="heart.fill"
            android_material_icon_name="favorite"
            size={32}
            color={theme.success}
          />
          <Text style={[styles.supportText, { color: theme.text }]}>
            Remember: You&apos;re taking positive steps to manage your finances. This is a sign of strength, not weakness.
          </Text>
        </View>

        <View style={{ height: 40 }} />
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
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  list: {
    marginTop: 12,
    marginLeft: 8,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 28,
  },
  supportCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
});
