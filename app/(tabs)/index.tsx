
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBudget } from '@/contexts/BudgetContext';

export default function OverviewScreen() {
  const {
    monthlyIncome,
    expenses,
    currency,
    setMonthlyIncome,
    loading,
  } = useBudget();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [incomeInput, setIncomeInput] = useState(monthlyIncome.toString());

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const essentialExpenses = expenses
    .filter(e => e.category === 'essential')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const nonEssentialExpenses = expenses
    .filter(e => e.category === 'non-essential')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = monthlyIncome - totalExpenses;

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]}>
        <ActivityIndicator size="large" color="#64c896" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#141414' : '#fafafa' }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: isDark ? '#f0f0f0' : '#323232' }]}>
          Budget Overview
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#b0b0b0' : '#666' }]}>
          You're taking control
        </Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[styles.label, { color: isDark ? '#b0b0b0' : '#666' }]}>
            Monthly Income
          </Text>
          <View style={styles.inputRow}>
            <Text style={[styles.currencySymbol, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              {currency}
            </Text>
            <TextInput
              style={[styles.input, { color: isDark ? '#f0f0f0' : '#323232', borderColor: isDark ? '#323232' : '#dcdcdc' }]}
              value={incomeInput}
              onChangeText={setIncomeInput}
              onBlur={() => setMonthlyIncome(parseFloat(incomeInput) || 0)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={isDark ? '#666' : '#999'}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#f0f0f0' : '#323232' }]}>
            This Month
          </Text>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: isDark ? '#b0b0b0' : '#666' }]}>
              Essential Expenses
            </Text>
            <Text style={[styles.rowValue, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              {currency}{essentialExpenses.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: isDark ? '#b0b0b0' : '#666' }]}>
              Non-Essential
            </Text>
            <Text style={[styles.rowValue, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              {currency}{nonEssentialExpenses.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={[styles.rowLabel, styles.totalLabel, { color: isDark ? '#f0f0f0' : '#323232' }]}>
              Remaining
            </Text>
            <Text style={[styles.rowValue, styles.totalValue, { color: remaining >= 0 ? '#64c896' : '#ff6b6b' }]}>
              {currency}{remaining.toFixed(2)}
            </Text>
          </View>
        </View>

        {nonEssentialExpenses > 0 && (
          <View style={[styles.encouragementCard, { backgroundColor: isDark ? '#1e3a2e' : '#e8f5f0' }]}>
            <Text style={[styles.encouragementText, { color: isDark ? '#90d4b8' : '#2d8a5f' }]}>
              💡 You could save {currency}{nonEssentialExpenses.toFixed(2)} by cutting non-essentials
            </Text>
          </View>
        )}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    borderBottomWidth: 2,
    paddingVertical: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 16,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  encouragementCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  encouragementText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
