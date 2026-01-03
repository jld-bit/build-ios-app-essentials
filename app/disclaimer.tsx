
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DisclaimerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Disclaimer
        </Text>
        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[styles.text, { color: isDark ? '#b0b0b0' : '#666' }]}>
            This app is for general budgeting guidance only. It does not provide financial, legal, or professional advice.
          </Text>
          <Text style={[styles.text, { color: isDark ? '#b0b0b0' : '#666' }]}>
            Users are responsible for their own financial decisions. Please consult with a qualified financial advisor for personalized advice.
          </Text>
          <Text style={[styles.text, { color: isDark ? '#b0b0b0' : '#666' }]}>
            The developers of this app are not liable for any financial losses or decisions made based on the information provided by this application.
          </Text>
        </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
